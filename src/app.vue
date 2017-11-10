<!--suppress ALL -->
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<style lang="scss" rel="stylesheet/scss">
body,
div,
h1,
h2,
h3,
h4,
h5,
h6,
p,
ul,
ol,
li,
form,
input,
table,
th,
td {
    margin: 0;
    padding: 0;
}

h1,
h2,
h3,
h4,
h5,
h6,
strong {
    font-weight: 400;
}

i,
em {
    font-style: normal;
}

ul,
ol {
    list-style-type: none;
}

a {
    text-decoration: none;
}

img {
    display: block;
    width: 100%;
}

table {
    border-collapse: collapse;
    border-spacing: 0;
}
body{
    background-color: #F4F5F7;
}

.two-line-break{
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
}
.three-line-break{
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    word-break: break-all;
}
</style>
