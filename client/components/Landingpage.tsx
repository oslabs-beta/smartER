import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const Landingpage: React.FC<{}> = () => {
  const githubLogo = (
    <svg
      fill="white"
      height="20"
      aria-hidden="true"
      viewBox="0 0 16 16"
      version="1.1"
      width="20"
      data-view-component="true"
      className="github-logo"
    >
      <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
    </svg>
  );

  const navigate = useNavigate();
  const handleDemoClick = (e: any) => {
    e.preventDefault();
    navigate('/homepage');
  };

  const handleGithubClick = (e: any) => {
    e.preventDefault();
    window.location.href = 'https://github.com/oslabs-beta/smartER';
  };
  return (
    <div className="landing-page-container">
      <div className="landing-page-header">
        <a href="https://github.com/oslabs-beta/smartER">{githubLogo}</a>
      </div>
      <p>query faster, query simpler</p>
      <h1 className="landing-page-title">smartER</h1>
      <h2>
        Querying a new database can be daunting. Use SmartER to visualize your
        organization's ER diagram as you build your query!
      </h2>
      <div>
        <button
          type="submit"
          onClick={handleGithubClick}
          className="landing-page-small-btn"
        >
          Github readme
        </button>
      </div>
      <div>
        <button
          type="button"
          onClick={handleDemoClick}
          className="landing-page-demo-btn"
        >
          Try our Demo!
        </button>
      </div>
      <h3>
        SmartER is a powerful open-source tool built for new and experienced SQL
        users alike. Features include:
      </h3>
      <ul>
        <li>Visualize your database's ER as you type</li>
        <li>Powerful, interactive UI</li>
        <li>Save your queries for later use</li>
        <li>View your query results as you build.</li>
      </ul>

      <div className="landing-page-section">
        <div className="landing-page-section-text">
          <h2>How to use SmartER:</h2>
          <p>
            To get started, simply enter your database URI or credentials in the
            settings tab. Then start entering your query under the query tab!
          </p>
        </div>
        <img src="https://unsplash.it/600/400" />
      </div>

      <div className="landing-page-section">
        <img src="https://unsplash.it/600/400" />
        <div className="landing-page-section-text">
          <h2>Visualize as you type!</h2>
          <p>
            Start typing your query, as you go SmartER will mapping out your
            database's ER diagram with the relevant tables, highlight columns,
            and show you the relationships between tables.
          </p>
        </div>
      </div>

      <div className="landing-page-section">
        <div className="landing-page-section-text">
          <h2>Full Interaction with your ER Diagram</h2>
          <p>
            SmartER's interactive ER diagram allows you to drag and drop tables
            to accomodate your needs.
          </p>
        </div>
        <img src="https://unsplash.it/600/400" />
      </div>

      <div className="landing-page-section">
        <img src="https://unsplash.it/600/400" />
        <div className="landing-page-section-text">
          <h2>Save Your Queries for Later</h2>
          <p>
            Have a query you use often? Save it for later use! SmartER will save
            your query so you can build upon, update, and run it again later.
          </p>
        </div>
      </div>

      <div className="landing-page-section">
        <div className="landing-page-section-text">
          <h2>View Query Results as You Build</h2>
          <p>
            As you type, valid queries will be run and the results will be shown
            below the query editor. Use this to see how your query is
            progressing and to make sure you are getting the results you want.
          </p>
        </div>
        <img src="https://unsplash.it/600/400" />
      </div>

      <footer className="footer">
        <h3>
          SmartER was developed under OSLabs by the following team members:
          <br />
          <br />
          <div className="name-container">
            <a href="https://github.com/joyxek">{githubLogo}</a>
            <p className="small-text">Joyce Kwak</p>
          </div>
          <div className="name-container">
            <a href="https://github.com/melissamcl">{githubLogo}</a>
            <p className="small-text">Melissa McLaughlin</p>
          </div>
          <div className="name-container">
            <a href="https://github.com/n8ngo">{githubLogo}</a>
            <p className="small-text">Nathan Ngo</p>
          </div>
          <div className="name-container">
            <a href="https://github.com/b-v-u">{githubLogo}</a>
            <p className="small-text">Brian Vu</p>
          </div>
        </h3>
      </footer>
    </div>
  );
};

export default Landingpage;
