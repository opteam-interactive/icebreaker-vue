<script setup lang="ts">
import { Minus } from "lucide-vue-next";
interface PlayerNameTagProps {
    index: number
    participant: string
    removeParticipant: (index: number) => void
}
const { index, participant, removeParticipant } = defineProps<PlayerNameTagProps>();
</script>

<template>
    <div class="flex  gap-4 p-2">
        <button class="btn btn-info btn-soft rounded-full  cursor-default grow text-blue-200 ">
            {{ participant }}
        </button>
        <button class="btn btn-circle btn-soft btn-error "@click="removeParticipant(index)">
            <Minus />
        </button>
    </div>


</template>

<style lang="scss" scoped></style>