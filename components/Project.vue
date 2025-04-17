<template>
    <NuxtLink :to='post.uri'>
        <div class="flex 
        items-center 
        bg-primary
        p-8 
        rounded-lg 
        text-white 
        transition-all 
        hover:-translate-y-1 
        hover:scale-105"
        >
            <div>
                <h2 class="font-semibold text-2xl">{{ post.title }}</h2>
                <p class="font-sans">{{ new Date(post.date).toLocaleDateString() }}</p>
            </div>
        </div>
    </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{
    post: Record<'title' | 'date' | 'excerpt' | 'uri', string>
}>();

</script>