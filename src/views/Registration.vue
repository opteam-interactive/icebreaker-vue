<script setup lang="ts">
import { ref, onMounted, onUpdated } from "vue";
import logo_LHBA from "@/assets/images/logo_LHBA.svg";
import { UserPlus, ArrowDownUp, CircleX, Dices } from "lucide-vue-next";
import PlayerNameTag from "@/components/game/PlayerNameTag.vue";

const newName = ref("");
const participants = ref<string[]>([]);

onMounted(() => {
    sessionStorage.setItem("currentParticipants", JSON.stringify(participants.value));
})
onUpdated(() => {
    sessionStorage.setItem("currentParticipants", JSON.stringify(participants.value));
})

const addParticipant = (name: string) => {
    if (name === "" || name === undefined || name === null) return;
    participants.value = ([...participants.value, name]);
    newName.value = ("");
}

const removeParticipant = (index: number) => {
    const newParticipantsArray = [...participants.value.slice(0, index), ...participants.value.slice(index + 1)];
    participants.value = (newParticipantsArray);
}

const clearParticipants = () => {
    participants.value = ([]);
}
const reorderParticipants = () => {
    participants.value = participants.value.sort((a: string, b: string) => {
        // Ensure the array is sorted case-insensitively
        return a.toLowerCase().localeCompare(b.toLowerCase());
    });
};

const addTestParticipants = () => {
    participants.value = (["Nathan", "Luc", "Clément", "Loic", "Louanne", "Julien", "Pierre", "Mathieu", "Julie", "Sarah", "Léa", "John", "Marc", "Antoine"]);
}

</script>

<template>
    <div class="flex flex-col items-center h-full justify-center gap-8  grow p-4">
        <img :src="logo_LHBA" alt="" class="max-w-1/10" />
        <h1 class="text-4xl">Les participants</h1>

        <div class="grid md:grid-cols-5 md:flex-row gap-4 w-3/4 md:w-2/3 mx-auto">
            <input type="text" placeholder="Nom du participant" class="input rounded-full col-span-2 w-full "
                v-model="newName" />
            <button class="btn btn-success rounded-full btn-soft" @click="addParticipant(newName)">Ajouter
                <UserPlus />
            </button>
            <button class="btn btn-info rounded-full btn-soft" @click="reorderParticipants">Réorganiser
                <ArrowDownUp />
            </button>
            <button class="btn btn-error rounded-full btn-soft" @click="clearParticipants">Reinitialiser
                <CircleX />
                <ListRestart />
            </button>

            <!-- <Button class="bg-white text-primary hover:bg-neutral-300 " onClick={() => addParticipant(newName)}>Ajouter</Button>
                <Button class="border " onClick={() => reorderParticipants()}>Réorganiser</Button>
                <Button class="col-span-2 md:col-span-1" onClick={() => clearParticipants()} variant="destructive">Reinitialiser</Button> -->

        </div>




        <div class="border w-3/4 rounded-xl grow flex flex-col ">
            <div v-if="participants.length === 0" class="flex flex-col items-center  justify-center gap-8   grow">
                <h1 class="text-4xl">Aucun participant pour le moment</h1>
            </div>
            <div v-else class="grid md:grid-cols-2 max-h-72 overflow-scroll">
                <div v-for="(participant, index) in participants">
                    <PlayerNameTag :index="index" :participant="participant" :removeParticipant="removeParticipant" />
                </div>

            </div>

        </div>

        <button class="" @click="addTestParticipants">Test</button>
        <RouterLink to="/game" class="btn rounded-full  bg-lightblue  lg:w-1/2 gap-4">
            JOUER
            <Dices />
        </RouterLink>
    </div>
</template>

<style lang="scss" scoped></style>