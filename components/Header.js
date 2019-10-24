import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

class Header extends React.Component {
  render() {
    const { title, description, duration, color } = this.props;
    return (
<header class="md-top-bar md-top-bar--light" role="navigation">
  <div class="md-top-bar__container">
    <div class="md-top-bar__brand">
      <a class="md-brand" href="/">
        <div class="md-brand__logo">
            <img src="/images/cisco/cisco-logo-black.svg" alt="Bridging Schedules" />
        </div>
        <div class="md-brand__title">Bridging Schedules</div>
      </a>
    </div>
    <nav class="md-top-bar__nav ">
      <div class="md-list md-list--horizontal" role="list">
        <a class="md-list-item active" role="listItem" href="javascript:void(0)">Develop</a>
        <a class="md-list-item" role="listItem" href="javascript:void(0)">Styles</a>
        <a class="md-list-item" role="listItem" href="javascript:void(0)">Layout</a>
        <a class="md-list-item" role="listItem" href="javascript:void(0)">Navigation</a>
      </div>
    </nav>
    <div class="md-top-bar__right ">
       <div class="md-top-bar__user">
          <a href="javascript:void(0)">My Apps</a>
         <div class="md-avatar" tabindex="0" aria-haspopup="true">
            <img class="user-image" src="https://randomuser.me/api/portraits/men/85.jpg" />
         </div>
       </div>
    </div>
    <i class="md-top-bar__mobile-menu-button icon icon-list-menu_20"></i>
    <div class="md-top-bar__mobile md-tb-mobile">
      <i class="icon icon-cancel_20"></i>
        <div class="md-top-bar__brand">
          <a class="md-brand" href="/">
            <div class="md-brand__logo">
                <img src="/assets/spark-logo.svg" />
            </div>
            <div class="md-brand__title">Momentum UI</div>
          </a>
        </div>
      <div class="md-list-separator"></div>
      <nav class="md-tb-mobile__nav" role="navigation">
        <a class="md-list-item active" role="listItem" href="javascript:void(0)">Develop</a>
        <a class="md-list-item" role="listItem" href="javascript:void(0)">Styles</a>
        <a class="md-list-item" role="listItem" href="javascript:void(0)">Layout</a>
        <a class="md-list-item" role="listItem" href="javascript:void(0)">Navigation</a>
        <div class="md-list-separator"></div>
        <a class="md-list-item" role="listItem" href="javascript:void(0)">Sign out</a>
      </nav>
    </div>
    <div class="md-tb-mobile__mask" role="none"></div>
  </div>
</header>
    );
  }
}

export default Header;
