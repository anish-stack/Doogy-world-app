import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
  
               
            <header className="page-header row">
                <div className="logo-wrapper d-flex align-items-center col-auto">
                    <Link to="/">
                        <img className="light-logo img-fluid" src="../assets/images/logo/logo1.png" alt="logo" />
                        <img className="dark-logo img-fluid" src="../assets/images/logo/logo-dark.png" alt="logo" />
                    </Link>
                    <Link className="close-btn toggle-sidebar" to="#" data-action="toggle-sidebar">
                        <svg className="svg-color">
                            <use href="../assets/svg/iconly-sprite.svg#Category" />
                        </svg>
                    </Link>
                </div>
                <div className="page-main-header col">
                    <div className="header-left">
                        <form className="form-inline search-full col" action="#" method="get">
                            <div className="form-group w-100">
                                <div className="Typeahead Typeahead--twitterUsers">
                                    <div className="u-posRelative">
                                        <input
                                            className="demo-input Typeahead-input form-control-plaintext w-100"
                                            type="text"
                                            placeholder="Search Admiro .."
                                            name="q"
                                            title=""
                                            autoFocus
                                        />
                                        <div className="spinner-border Typeahead-spinner" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                        <i className="close-search" data-feather="x"></i>
                                    </div>
                                    <div className="Typeahead-menu"></div>
                                </div>
                            </div>
                        </form>
                        <div className="form-group-header d-lg-block d-none">
                            <div className="Typeahead Typeahead--twitterUsers">
                                <div className="u-posRelative d-flex align-items-center">
                                    <input
                                        className="demo-input py-0 Typeahead-input form-control-plaintext w-100"
                                        type="text"
                                        placeholder="Type to Search..."
                                        name="q"
                                        title=""
                                    />
                                    <i className="search-bg iconly-Search icli"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="nav-right">
                        <ul className="header-right">
                            <li className="custom-dropdown">
                                <div className="translate_wrapper">
                                    <div className="current_lang">
                                        <Link className="lang" to="#" data-action="change-language">
                                            <i className="flag-icon flag-icon-us"></i>
                                            <h6 className="lang-txt f-w-700">ENG</h6>
                                        </Link>
                                    </div>
                                    <ul className="custom-menu profile-menu language-menu py-0 more_lang">
                                        <li className="d-block">
                                            <Link className="lang" to="#" data-value="English">
                                                <i className="flag-icon flag-icon-us"></i>
                                                <div className="lang-txt">English</div>
                                            </Link>
                                        </li>
                                        <li className="d-block">
                                            <Link className="lang" to="#" data-value="fr">
                                                <i className="flag-icon flag-icon-fr"></i>
                                                <div className="lang-txt">Français</div>
                                            </Link>
                                        </li>
                                        <li className="d-block">
                                            <Link className="lang" to="#" data-value="es">
                                                <i className="flag-icon flag-icon-es"></i>
                                                <div className="lang-txt">Español</div>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="search d-lg-none d-flex">
                                <Link to="#" data-action="toggle-search">
                                    <svg>
                                        <use href="../assets/svg/iconly-sprite.svg#Search" />
                                    </svg>
                                </Link>
                            </li>
                            <li>
                                <Link className="dark-mode" to="#" data-action="toggle-dark-mode">
                                    <svg>
                                        <use href="../assets/svg/iconly-sprite.svg#moondark" />
                                    </svg>
                                </Link>
                            </li>
                            <li className="custom-dropdown">
                                <Link to="#" data-action="notifications">
                                    <svg>
                                        <use href="../assets/svg/iconly-sprite.svg#notification" />
                                    </svg>
                                </Link>
                                <span className="badge rounded-pill badge-primary">4</span>
                                <div className="custom-menu notification-dropdown py-0 overflow-hidden">
                                    <h3 className="title bg-primary-light dropdown-title">
                                        Notification <span className="font-primary">View all</span>
                                    </h3>
                                </div>
                            </li>
                            <li>
                                <Link className="full-screen" to="#" data-action="fullscreen">
                                    <svg>
                                        <use href="../assets/svg/iconly-sprite.svg#scanfull" />
                                    </svg>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
     
    );
};

export default Header;
