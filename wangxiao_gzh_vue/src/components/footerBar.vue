<template>
  <div class="footer">
    <mu-tabs :value.sync="active3" center color="teal">
    <mu-tab>
      <mu-icon value="phone"></mu-icon>
      首页
    </mu-tab>
    <mu-tab>
      <mu-icon value="favorite"></mu-icon>
      保驾
    </mu-tab>
    <mu-tab>
      <mu-icon value="person_pin"></mu-icon>
      我的
    </mu-tab>
  </mu-tabs>
</div>
</template>
<style scope lang="less">
/* footer */
.footer {
    position: absolute;
    width: 100%;
    bottom: 0;
}
.mu-tab-link-highlight{
    display: none;
}
</style>