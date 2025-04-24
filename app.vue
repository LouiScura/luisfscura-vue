<template>
  <div class="font-sans m-0 p-0 relative">
      <NuxtLoadingIndicator
          color="#A8E6CF"/>
    <Header></Header>
    <NuxtPage />
  </div>
  </template>
<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
