import React, { useCallback, useEffect, useState } from 'react';
import { ImagePlus, Plus, Save, Trash2 } from 'lucide-react';
import Layout from '../../layouts/Layout';
import Header from '../../layouts/Header';
import { supabase } from '../../config/Supabase';
import './ProjectsPageSettings.css';

const emptySettings = {
  eyebrow: '',
  title: '',
  description: ''
};

const ProjectsPageSettings = () => {
  const [settings, setSettings] = useState(emptySettings);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingPage, setSavingPage] = useState(false);
  const [busyCategory, setBusyCategory] = useState('');
  const [uploadingCategory, setUploadingCategory] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const loadPage = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [{ data: pageSettings, error: settingsError }, { data: pageCategories, error: categoriesError }] =
        await Promise.all([
          supabase.from('project_page_settings').select('eyebrow, title, description').eq('id', true).maybeSingle(),
          supabase.from('project_page_categories').select('*').order('sort_order', { ascending: true })
        ]);

      if (settingsError) throw settingsError;
      if (categoriesError) throw categoriesError;
      if (!pageSettings) {
        throw new Error('Project page settings are missing. Run dashboard/supabase/project_page.sql in the Supabase SQL Editor.');
      }

      setSettings({
        eyebrow: pageSettings.eyebrow || '',
        title: pageSettings.title || '',
        description: pageSettings.description || ''
      });
      setCategories(pageCategories || []);
    } catch (loadError) {
      console.error('Unable to load project page settings:', loadError);
      setError(loadError.message || 'Unable to load the project page settings.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPage();
  }, [loadPage]);

  const savePageSettings = async (event) => {
    event.preventDefault();
    setSavingPage(true);
    setError('');
    setMessage('');
    try {
      const { error: saveError } = await supabase
        .from('project_page_settings')
        .update({ ...settings, updated_at: new Date().toISOString() })
        .eq('id', true)
        .select('id')
        .single();

      if (saveError) throw saveError;
      setMessage('Page heading saved.');
    } catch (saveError) {
      console.error('Unable to save project page settings:', saveError);
      setError(saveError.message || 'Unable to save the page heading.');
    } finally {
      setSavingPage(false);
    }
  };

  const updateCategory = (id, field, value) => {
    setCategories((current) => current.map((category) => (
      category.id === id ? { ...category, [field]: value } : category
    )));
  };

  const addCategory = () => {
    const sortOrder = categories.reduce((highest, category) => Math.max(highest, Number(category.sort_order) || 0), 0) + 1;
    setCategories((current) => [
      ...current,
      {
        id: `draft-${Date.now()}`,
        card_number: String(sortOrder).padStart(2, '0'),
        title: '',
        description: '',
        image_url: '',
        href: '',
        image_alt: '',
        sort_order: sortOrder,
        visible: true
      }
    ]);
  };

  const saveCategory = async (category) => {
    if (!category.title.trim() || !/^\/[A-Za-z0-9_-]+$/.test(category.href.trim())) {
      setError('Each category needs a title and a one-part page path, such as /uiux.');
      return;
    }

    setBusyCategory(category.id);
    setError('');
    setMessage('');
    const payload = {
      card_number: category.card_number.trim(),
      title: category.title.trim(),
      description: category.description.trim(),
      image_url: category.image_url.trim(),
      href: category.href.trim(),
      image_alt: category.image_alt.trim(),
      sort_order: Number(category.sort_order) || 0,
      visible: Boolean(category.visible),
      updated_at: new Date().toISOString()
    };

    try {
      if (String(category.id).startsWith('draft-')) {
        const { data, error: insertError } = await supabase
          .from('project_page_categories')
          .insert(payload)
          .select('*')
          .single();
        if (insertError) throw insertError;
        setCategories((current) => current.map((item) => item.id === category.id ? data : item));
      } else {
        const { error: updateError } = await supabase
          .from('project_page_categories')
          .update(payload)
          .eq('id', category.id)
          .select('id')
          .single();
        if (updateError) throw updateError;
      }
      setMessage(`"${category.title}" saved.`);
    } catch (saveError) {
      console.error('Unable to save project category:', saveError);
      setError(saveError.message || 'Unable to save this category.');
    } finally {
      setBusyCategory('');
    }
  };

  const deleteCategory = async (category) => {
    if (!window.confirm(`Delete "${category.title || 'this category'}" from the portfolio Projects page?`)) return;

    if (String(category.id).startsWith('draft-')) {
      setCategories((current) => current.filter((item) => item.id !== category.id));
      return;
    }

    setBusyCategory(category.id);
    setError('');
    setMessage('');
    try {
      const { error: deleteError } = await supabase
        .from('project_page_categories')
        .delete()
        .eq('id', category.id)
        .select('id')
        .single();
      if (deleteError) throw deleteError;
      setCategories((current) => current.filter((item) => item.id !== category.id));
      setMessage('Category deleted.');
    } catch (deleteError) {
      console.error('Unable to delete project category:', deleteError);
      setError(deleteError.message || 'Unable to delete this category.');
    } finally {
      setBusyCategory('');
    }
  };

  const uploadCategoryImage = async (category, event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingCategory(category.id);
    setError('');
    setMessage('');
    try {
      const extension = file.name.split('.').pop();
      const filePath = `project-categories/${crypto.randomUUID()}.${extension}`;
      const { error: uploadError } = await supabase.storage
        .from('portfolio-assets')
        .upload(filePath, file, { upsert: false });
      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('portfolio-assets').getPublicUrl(filePath);
      updateCategory(category.id, 'image_url', data.publicUrl);
      setMessage('Image uploaded. Save the category to publish it.');
    } catch (uploadError) {
      console.error('Unable to upload project category image:', uploadError);
      setError(uploadError.message || 'Unable to upload this image.');
    } finally {
      setUploadingCategory('');
      event.target.value = '';
    }
  };

  return (
    <Layout>
      <main className="projects-page-settings">
        <Header title="Pages / Projects Page" />

        <div className="projects-settings-intro">
          <div>
            <p className="projects-settings-eyebrow">Portfolio content</p>
            <h1>Projects page</h1>
            <p>Edit the heading and category cards shown on your public portfolio.</p>
          </div>
        </div>

        {error && <div className="projects-settings-notice error" role="alert">{error}</div>}
        {message && <div className="projects-settings-notice success" role="status">{message}</div>}

        {loading ? (
          <div className="projects-settings-loading">Loading Projects page settings...</div>
        ) : (
          <>
            <form className="projects-settings-panel" onSubmit={savePageSettings}>
              <div className="projects-settings-panel-heading">
                <div>
                  <h2>Page heading</h2>
                  <p>These details appear above the category cards.</p>
                </div>
                <button className="projects-settings-primary" type="submit" disabled={savingPage}>
                  <Save size={16} aria-hidden="true" />
                  {savingPage ? 'Saving...' : 'Save heading'}
                </button>
              </div>

              <div className="projects-settings-fields">
                <label>
                  Eyebrow
                  <input
                    value={settings.eyebrow}
                    onChange={(event) => setSettings((current) => ({ ...current, eyebrow: event.target.value }))}
                    maxLength={100}
                  />
                </label>
                <label>
                  Main title
                  <input
                    value={settings.title}
                    onChange={(event) => setSettings((current) => ({ ...current, title: event.target.value }))}
                    required
                    maxLength={160}
                  />
                </label>
                <label className="full-width">
                  Description
                  <textarea
                    value={settings.description}
                    onChange={(event) => setSettings((current) => ({ ...current, description: event.target.value }))}
                    rows={3}
                    maxLength={500}
                  />
                </label>
              </div>
            </form>

            <section className="projects-settings-panel">
              <div className="projects-settings-panel-heading">
                <div>
                  <h2>Category cards</h2>
                  <p>Add, edit, hide, reorder, or delete the cards visitors can see.</p>
                </div>
                <button className="projects-settings-secondary" type="button" onClick={addCategory}>
                  <Plus size={16} aria-hidden="true" />
                  Add category
                </button>
              </div>

              <div className="projects-settings-category-list">
                {categories.length === 0 ? (
                  <p className="projects-settings-empty">No categories yet. Add one to show it on the portfolio.</p>
                ) : categories.map((category) => (
                  <article className="projects-settings-category" key={category.id}>
                    <div className="projects-settings-category-image">
                      {category.image_url ? (
                        <img src={category.image_url} alt={category.image_alt || ''} />
                      ) : (
                        <ImagePlus size={28} aria-hidden="true" />
                      )}
                      <label className="projects-settings-upload">
                        {uploadingCategory === category.id ? 'Uploading...' : 'Change image'}
                        <input
                          type="file"
                          accept="image/*"
                          disabled={uploadingCategory === category.id}
                          onChange={(event) => uploadCategoryImage(category, event)}
                        />
                      </label>
                    </div>

                    <div className="projects-settings-category-fields">
                      <label>
                        Number
                        <input
                          value={category.card_number}
                          onChange={(event) => updateCategory(category.id, 'card_number', event.target.value)}
                          maxLength={8}
                        />
                      </label>
                      <label>
                        Display order
                        <input
                          type="number"
                          value={category.sort_order}
                          onChange={(event) => updateCategory(category.id, 'sort_order', event.target.value)}
                        />
                      </label>
                      <label>
                        Category title
                        <input
                          value={category.title}
                          onChange={(event) => updateCategory(category.id, 'title', event.target.value)}
                          required
                          maxLength={120}
                        />
                      </label>
                      <label>
                        Page path
                        <input
                          value={category.href}
                          onChange={(event) => updateCategory(category.id, 'href', event.target.value)}
                          placeholder="/uiux"
                          required
                        />
                      </label>
                      <label className="full-width">
                        Description
                        <textarea
                          value={category.description}
                          onChange={(event) => updateCategory(category.id, 'description', event.target.value)}
                          rows={2}
                          maxLength={300}
                        />
                      </label>
                      <label className="full-width">
                        Image alt text
                        <input
                          value={category.image_alt}
                          onChange={(event) => updateCategory(category.id, 'image_alt', event.target.value)}
                          maxLength={200}
                        />
                      </label>
                      <label className="projects-settings-visible full-width">
                        <input
                          type="checkbox"
                          checked={Boolean(category.visible)}
                          onChange={(event) => updateCategory(category.id, 'visible', event.target.checked)}
                        />
                        Show this category on the public portfolio
                      </label>
                    </div>

                    <div className="projects-settings-category-actions">
                      <button
                        className="projects-settings-primary"
                        type="button"
                        onClick={() => saveCategory(category)}
                        disabled={busyCategory === category.id || uploadingCategory === category.id}
                      >
                        <Save size={16} aria-hidden="true" />
                        {busyCategory === category.id ? 'Saving...' : 'Save card'}
                      </button>
                      <button
                        className="projects-settings-delete"
                        type="button"
                        onClick={() => deleteCategory(category)}
                        disabled={busyCategory === category.id}
                      >
                        <Trash2 size={16} aria-hidden="true" />
                        Delete
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </Layout>
  );
};

export default ProjectsPageSettings;
