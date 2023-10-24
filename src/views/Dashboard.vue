<template>
  <div :style="mapCssProps">
    <vd-sidebar
      :isVisible="sidebarIsVisible"
      :showCloseButton="isCollapse"
      @close-sidebar="closeSidebar"
      :headerHeight="sidebarHeaderHeight"
      :sidebarWidth="sidebarWidth"
      :background="sidebarBackground"
    >
      <template v-slot:header>
        <slot name="sidebar-header"></slot>
      </template>
      <template v-slot:content>
        <slot name="sidebar-content"></slot>
      </template>
    </vd-sidebar>
    <div class="vd-main">
      <vd-header
        :showMenuButton="isCollapse"
        @open-menu="openMenu"
        :pageBackground="pageBackground"
        :background="headerBackground"
        :sidebarWidth="sidebarWidth"
      >
        <slot name="header-content"></slot>
      </vd-header>
      <div class="vd-content" @click="pageClick">
        <slot name="main-content"></slot>
      </div>
    </div>
  </div>
</template>




<style lang="scss" scoped>
$sidebarWidth: var(--vd-sidebar-width, 300px);

.vd-main {
  padding-left: $sidebarWidth;
  transition: all 0.5s;
  -webkit-transition: all 0.25s;
}
.vd-content {
  padding: 6rem 1.5rem 0rem 1.5rem;
  background-color: var(--vd-page-background, white);
  position: absolute;
  min-height: 100%;
  width: -webkit-calc(100% - $sidebarWidth);
  width: -moz-calc(100% - $sidebarWidth);
  width: calc(100% - $sidebarWidth);
}
@media screen and (max-width: 1200px) {
  .vd-main {
    padding-left: 0px;
  }
  .vd-content {
    width: 100%;
  }
}
</style>