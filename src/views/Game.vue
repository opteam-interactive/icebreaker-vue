<script setup lang="ts">
import { ref, onUnmounted, onMounted } from "vue";
import { fetchQuestions, fetchParticipants } from "@/lib/game";
import { useRouter, } from "vue-router";
import logo_LHBA from "@/assets/images/logo_LHBA.svg";
import logo_opteam from "@/assets/images/logo_opteam.png";
import { Undo2 } from "lucide-vue-next";
const router = useRouter();


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
};

// Function to handle next question
const nextQuestion = () => {

    //If questions finished, restart the questions
    const nextIndex = game.value.questions.indexOf(game.value.currentQuestion) + 1 === game.value.questions.length ? 0 : game.value.questions.indexOf(game.value.currentQuestion) + 1;
    game.value.currentQuestion = game.value.questions[nextIndex]
    startTimer();


    //Redirect home when over
    if (game.value.participants.indexOf(game.value.currentName) + 1 === game.value.participants.length) {
        console.log("Game over");
        router.push("/register");
    }
    else {
        const nextNameIndex = game.value.participants.indexOf(game.value.currentName) + 1;
        game.value.currentName = game.value.participants[nextNameIndex];
    }

}

// Function to start the timer
const startTimer = () => {
    console.log('Starting timer...');

    let countdownIntervalId: number | null = null;

    if (countdownIntervalId) {
        clearInterval(countdownIntervalId);
        countdownIntervalId = null;
    }

    const duration = 60;
    game.value.countDown = duration;

    countdownIntervalId = setInterval(() => {
        if (game.value.countDown <= 1) {
            if (countdownIntervalId) {
                clearInterval(countdownIntervalId);
                countdownIntervalId = null;
            }
            game.value.countDown = 0;
        } else {
            game.value.countDown--;
        }
    }, 1000);

    onUnmounted(() => {
        if (countdownIntervalId) {
            clearInterval(countdownIntervalId);
        }
    });
};

</script>

<template>
    <div v-if="loading" class="flex flex-col items-center h-full justify-center gap-16 relative text-center p-16">
        <p class="text-xl">Loading...</p>
    </div>
    <div v-else class="flex flex-col items-center h-full justify-center md:gap-16 relative text-center p-16 grow">
        <div class="flex justify-end w-full absolute top-0"><a class="btn btn-ghost" href="/registration">Retour aux participants <Undo2/></a></div>
       
        <div class="flex flex-col items-center gap-16 max-w-3/4 z-10">
            <h1 class="text-6xl underline decoration-secondary col-start-2">{{game.currentName}}</h1>
            <h2 class="text-5xl  leading-16">{{game.currentQuestion}}</h2>
            <button class="text-2xl border border-secondary rounded-full px-16 py-2 hover:bg-secondary cursor-pointer"
                @click="nextQuestion"><span>{{ game.countDown }}</span><span>0</span></button>


        </div>


        <div class="flex justify-end w-full absolute bottom-0 p-8 gap-8 ">
            <img :src="logo_LHBA" alt="" class="w-32" />
            <img :src="logo_opteam" alt="" class="w-32" />
        </div>
    </div>
</template>

<style lang="scss" scoped></style>