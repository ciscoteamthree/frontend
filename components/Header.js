import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

class Header extends React.Component {
  render() {
    const { title, description, duration, color } = this.props;
    return (
      <header className="md-top-bar md-top-bar--light" role="navigation">
        <div className="md-top-bar__container">
          <div className="md-top-bar__brand">
            <a className="md-brand" href="/">
              <div className="md-brand__logo">
                <img
                  src="/images/cisco/cisco-logo-black.svg"
                  alt="Bridging Schedules"
                />
              </div>
              <div className="md-brand__title">Bridging Schedules</div>
            </a>
          </div>
          <nav className="md-top-bar__nav ">
            <div className="md-list md-list--horizontal" role="list">
              <a
                className="md-list-item active"
                role="listItem"
                href="javascript:void(0)"
              >
                Develop
              </a>
              <a
                className="md-list-item"
                role="listItem"
                href="javascript:void(0)"
              >
                Styles
              </a>
              <a
                className="md-list-item"
                role="listItem"
                href="javascript:void(0)"
              >
                Layout
              </a>
              <a
                className="md-list-item"
                role="listItem"
                href="javascript:void(0)"
              >
                Navigation
              </a>
            </div>
          </nav>
          <div className="md-top-bar__right ">
            <div className="md-top-bar__user">
              <a href="javascript:void(0)">My Apps</a>
              <div className="md-avatar" tabIndex="0" aria-haspopup="true">
                <img
                  className="user-image"
                  src="https://randomuser.me/api/portraits/men/85.jpg"
                />
              </div>
            </div>
          </div>
          <i className="md-top-bar__mobile-menu-button icon icon-list-menu_20"></i>
          <div className="md-top-bar__mobile md-tb-mobile">
            <i className="icon icon-cancel_20"></i>
            <div className="md-top-bar__brand">
              <a className="md-brand" href="/">
                <div className="md-brand__logo">
                  <img src="/assets/spark-logo.svg" />
                </div>
                <div className="md-brand__title">Momentum UI</div>
              </a>
            </div>
            <div className="md-list-separator"></div>
            <nav className="md-tb-mobile__nav" role="navigation">
              <a
                className="md-list-item active"
                role="listItem"
                href="javascript:void(0)"
              >
                Develop
              </a>
              <a
                className="md-list-item"
                role="listItem"
                href="javascript:void(0)"
              >
                Styles
              </a>
              <a
                className="md-list-item"
                role="listItem"
                href="javascript:void(0)"
              >
                Layout
              </a>
              <a
                className="md-list-item"
                role="listItem"
                href="javascript:void(0)"
              >
                Navigation
              </a>
              <div className="md-list-separator"></div>
              <a
                className="md-list-item"
                role="listItem"
                href="javascript:void(0)"
              >
                Sign out
              </a>
            </nav>
          </div>
          <div className="md-tb-mobile__mask" role="none"></div>
        </div>
      </header>
    );
  }
}

export default Header;
