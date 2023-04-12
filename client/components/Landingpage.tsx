import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const Landingpage: React.FC<{}> = () => {
  const githubLogo = (
    <svg
      fill="white"
      height="15"
      aria-hidden="true"
      viewBox="0 0 16 16"
      version="1.1"
      width="15"
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

  // const handleGithubClick = (e: any) => {
  //   e.preventDefault();
  //   window.location.href = 'https://github.com/oslabs-beta/smartER';
  // };
  return (
    <div className="landing-page-container">
      <header>
        {/* <a href="https://github.com/oslabs-beta/smartER" target="_blank">
          {githubLogo}
        </a> */}
        {/* <p>query faster, query simpler</p> */}
        <div className="logo"></div>
      </header>

      <div className="landing-page-content">
        <h1 className="description">
          Querying a new database can be daunting. Use smartER to visualize your
          organization's ER diagram as you build your query!
        </h1>
        <div className="buttons">
          <a
            href="https://github.com/oslabs-beta/smartER"
            target="_blank"
            className="landing-page-small-btn"
          >
            Github readme
          </a>
          <button
            type="button"
            onClick={handleDemoClick}
            className="landing-page-demo-btn"
          >
            Try it out!
          </button>
        </div>
        <div className="features">
          <p>
            SmartER is a powerful open-source tool built for new and experienced
            SQL users alike. Features include:
          </p>
          <ul>
            <li>✓ Powerful, interactive UI</li>
            <li>✓ Visualize your ER diagram as you type</li>
            <li>✓ View your query results as you type</li>
            <li>✓ Save your queries for later use</li>
          </ul>
        </div>
        <div className="spacer"></div>
        <div className="landing-page-section ltr">
          <div className="landing-page-section-text">
            <h2>Top of the line security</h2>
            <p>
              To get started, sign up or login, then head to the Settings tab
              and enter your database URI or credentials. Rest assured your data
              is encrypted and secure! In the full version, login credentials
              are protected via one-way encryption and your URI is encrypted via
              AES. In the demo version, database credentials are stored only in
              front-end state and sent to the server with each request. In other
              words, once you leave the demo site, your credentials are no
              longer saved!
            </p>
          </div>
          <div className="images" id="security"></div>
        </div>

        <div className="landing-page-section rtl">
          <div className="landing-page-section-text">
            <h2>Visualize as you type!</h2>
            <p>
              After providing your credentials, start typing your query. As you
              type, smartER will map out your database's ER diagram with the
              tables you have selected, highlighting the columns in your select
              statement and displaying all the tables that have a relationship
              to those tables, whether directly or via a join table.
            </p>
          </div>
          <img src="https://unsplash.it/600/400" />
        </div>

        <div className="landing-page-section ltr">
          <div className="landing-page-section-text">
            <h2>Full interaction with your ER diagram</h2>
            <p>
              As your diagram renders, feel free to move things around! Database
              relationships can get complicated and smartER was built with that
              in mind! Our interactive ER diagram allows you to reposition
              tables to accomodate your needs.
            </p>
          </div>
          <img src="https://unsplash.it/600/400" />
        </div>

        <div className="landing-page-section rtl">
          <div className="landing-page-section-text">
            <h2>Save your queries for later</h2>
            <p>
              Have a query you use often? Or building something complex and
              don't want to lose progress? Save it for later! SmartER will save
              your query so you can build upon, update, and conveniently run it
              again later from the History tab.
            </p>
          </div>
          <img src="https://unsplash.it/600/400" />
        </div>

        <div className="landing-page-section ltr">
          <div className="landing-page-section-text">
            <h2>View query results as you build</h2>
            <p>
              As you type, valid queries will be run and the results will be
              shown below the query editor. Use this to see how your query is
              progressing and to make sure you are getting the results you want.
            </p>
          </div>
          <img src="https://unsplash.it/600/400" />
        </div>
      </div>

      <footer>
        <p>
          smartER was developed under OSLabs by the following team members:
          <ul>
            <li>
              <a href="https://github.com/joyxek">{githubLogo} Joyce Kwak</a>
            </li>
            <li>
              <a href="https://github.com/melissamcl">
                {githubLogo} Melissa McLaughlin
              </a>
            </li>
            <li>
              <a href="https://github.com/n8ngo">{githubLogo} Nathan Ngo</a>
            </li>
            <li>
              <a href="https://github.com/b-v-u">{githubLogo} Brian Vu</a>
            </li>
          </ul>
        </p>
      </footer>
    </div>
  );
};

export default Landingpage;
