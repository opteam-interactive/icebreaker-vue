<script setup lang="ts">
import logo_LHBA from "@/assets/images/logo_LHBA.svg";
import logo_opteam from "@/assets/images/logo_opteam.png";
import { ref } from "vue";

//fetch globals

const siteTitle = ref("Opteam 2023");
const siteDescription = ref("LHBA 2023");
const date = ref("19-20 septembre 2023");
</script>

<template > 

            <div class=" flex flex-col grow items-center justify-center relative  h-full " >
                <div class="flex  items-center justify-between px-24 py-16 absolute top-0">
                    <img :src="logo_LHBA" alt="" class="max-w-1/6" />
                    <img :src="logo_opteam" alt="" class="max-w-1/6" />
                </div>
                <div class="flex flex-col items-center gap-8 w-full">
                    <h1 class="text-4xl text-center">{{siteTitle}}</h1>
                    <h2 class="text-4xl text-center">{{siteDescription}}</h2>
                    <h2 class="capitalize text-2xl">{{date}}</h2>
                    <RouterLink class="btn btn-primary  rounded-full" to="/registration">
                        Prêt !
                    </RouterLink>
    
                </div>
            </div>

    
</template>
