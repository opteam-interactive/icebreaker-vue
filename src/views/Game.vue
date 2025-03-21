<script setup lang="ts">
import { ref, onUnmounted, onMounted, onUpdated } from "vue";
import { fetchQuestions, fetchParticipants } from "@/lib/game";
import { useRouter, } from "vue-router";
import logo_LHBA from "@/assets/images/logo_LHBA.svg";
import logo_opteam from "@/assets/images/logo_opteam.png";
import { Undo2, ArrowBigRightDash } from "lucide-vue-next";

interface Game {
    participants: string[];
    currentName: string;
    currentQuestion: string;
    countDown: number;
    questions: string[];
    intervalId: any
}

const game = ref<Game>({
    participants: [],
    currentName: "",
    currentQuestion: "",
    countDown: 0,
    questions: [],
    intervalId: null

});
const loading = ref(true);

onMounted(() => {
    initializeGame();
})

const router = useRouter();

const initializeGame = async () => {
    // Use the functions to fetch participants and questions
    const shuffledParticipants = fetchParticipants();
    const shuffledQuestions = await fetchQuestions();

    // Set participants and questions
    game.value.participants = shuffledParticipants;
    game.value.questions = shuffledQuestions;

    if (shuffledParticipants.length > 0) {
        game.value.currentName = shuffledParticipants[0];
    }
    if (shuffledQuestions.length > 0) {
        game.value.currentQuestion = shuffledQuestions[0];
    }
    loading.value = false;
    startTimer();
};

// Function to start the timer
const startTimer = () => {
    console.log('Starting timer...');

    if (game.value.intervalId) {
        clearInterval(game.value.intervalId);
    }

    const duration = 60;
    game.value.countDown = duration;

    game.value.intervalId = setInterval(() => {
        if (game.value.countDown > 0) {
            game.value.countDown--;
        } else {
            clearInterval(game.value.intervalId);
            game.value.intervalId = null;
        }
    }, 1000);
};
// Function to handle next question
const nextQuestion = () => {

    //If questions finished, restart the questions
    const nextIndex = game.value.questions.indexOf(game.value.currentQuestion) + 1 === game.value.questions.length ? 0 : game.value.questions.indexOf(game.value.currentQuestion) + 1;
    game.value.currentQuestion = game.value.questions[nextIndex]

    startTimer();

    // If last participant, go home
    if (game.value.participants.indexOf(game.value.currentName) + 1 === game.value.participants.length) {
        console.log("Game over");
        router.push("/registration");
    } else {
        const nextNameIndex = game.value.participants.indexOf(game.value.currentName) + 1;
        game.value.currentName = game.value.participants[nextNameIndex];
    }

}
onUnmounted(() => {
    if (game.value.intervalId) {
        clearInterval(game.value.intervalId);
    }
});


</script>

<template>
    <div v-if="loading" class="flex flex-col items-center h-full justify-center gap-16 relative text-center p-16">
        <p class="text-xl">Loading...</p>
    </div>
    <div v-else class="flex flex-col items-center h-full justify-center md:gap-16 relative text-center p-16 grow">
        <div class="flex justify-end w-full absolute top-0"><a class="btn btn-ghost" href="/registration">Retour aux
                participants
                <Undo2 />
            </a></div>

        <div class="flex flex-col items-center gap-16 max-w-3/4 z-10">
            <h1 class="text-6xl underline decoration-lightblue col-start-2">{{ game.currentName }}</h1>
            <h2 class="text-5xl  leading-16">{{ game.currentQuestion }}</h2>

            <Transition mode="out-in">
                <button v-if="game.countDown > 0" class="text-3xl btn btn-primary btn-outline w-1/4 rounded-full  "
                    @click="nextQuestion">{{ game.countDown }}</button>
                <button v-else class="btn rounded-full btn-primary w-1/4" @click="nextQuestion">Question suivante
                    <ArrowBigRightDash />
                </button>
            </Transition>


        </div>


        <div class="flex justify-end w-full absolute bottom-0 p-8 gap-8 ">
            <img :src="logo_LHBA" alt="" class="w-32" />
            <img :src="logo_opteam" alt="" class="w-32" />
        </div>
    </div>
</template>

<style lang="scss" scoped></style>