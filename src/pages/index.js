import React from 'react';
import { Helmet } from 'react-helmet';
import App from '../components/App';
import { headData } from '../mock/data';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/main.scss';

export default () => {
  const { title, lang, description } = headData;

  return (
    <>
      <Helmet>
        <script defer src="https://cloud.umami.is/script.js" data-website-id="4c3dd8fe-4f22-4218-92c4-23933449bb09"></script>
        <meta charSet="utf-8" />
        <title>{title || 'Pavan Khiani'}</title>
        <html lang={lang || 'en'} />
        <meta name="description" content={description || 'Pavan Khiani'} />
      </Helmet>
      <App />
    </>
  );
};
