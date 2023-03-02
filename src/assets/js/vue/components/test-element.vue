<template>
    <div class="text-gray-500 dark:text-gray-300">{{ title }}: {{ displayTime }}</div>
</template>
<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
    timeZone: {
        type: String,
        default: 'UTC',
    },
	title: {
		type: String,
        default: 'Roy',
	}
})

const emit = defineEmits(['datechange'])

const currentDateTime = ref(new Date())
const displayTime = computed(() =>
    currentDateTime.value.toLocaleString('en-GB', {
        timeZone: props.timeZone,
    })
)
setInterval(() => {
    currentDateTime.value = new Date()
    emit('datechange', displayTime)
}, 1000)
</script>
