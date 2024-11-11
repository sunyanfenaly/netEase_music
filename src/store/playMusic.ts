import { defineStore } from "pinia";
import { ref } from "vue";
import { getPlayer } from "@/services/initPlayer";

interface Song {
    name: string;
    url: string;
}

export const usePlayMusicStore = defineStore("playMusic", () => {
    const isPlaying = ref(false);
    const currentSong = ref({});
    //播放列表
    const playList = ref([]);
    const play = (song: Song) =>{
        const audio = getPlayer();
        audio.src = song.url;
        audio.play();
        isPlaying.value = true;
        currentSong.value = song;
    }
    const pause = () => {
        const audio = getPlayer();
        audio.pause();
        isPlaying.value = false;
    }
    
    return {
        isPlaying,
        currentSong,
        play,
        pause,
        getPlayer
    }
});