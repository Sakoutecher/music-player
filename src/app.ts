/**Data */
import { artists } from './data/artistsData'

/**Music player */
const music_player = <HTMLDivElement>document.querySelector('.music-player')

/**Button */
const forward = <HTMLButtonElement>document.querySelector('.forward')
const backward = <HTMLButtonElement>document.querySelector('.backward')
const play_pause = <HTMLButtonElement>document.querySelector('.play-pause')

/**Content */
const title = <HTMLHeadingElement>document.querySelector('.album-title')
const artist = <HTMLHeadingElement>document.querySelector('.artist')
const release_date = <HTMLSpanElement>document.querySelector('.release-date')
const description = <HTMLDivElement>document.querySelector('.description')
const album_cover = <HTMLImageElement>document.querySelector('#album-cover')
const duration = <HTMLInputElement>document.querySelector('.duration')
const volume = <HTMLInputElement>document.querySelector('.volume')
const endtime = <HTMLParagraphElement>document.querySelector('.endtime')
const starttime = <HTMLParagraphElement>document.querySelector('.starttime')
const music = <HTMLAudioElement>document.querySelector('#music')

/**Variables */
let index: number = 0

/**Function to init the project */
const initProject = (index: number): void => {
  duration.value = '0'
  music.volume = 0.5
  volume.value = '50'
  music.src = artists[index].music
  changeData(index)
}

/**Function to change the data on the init and when we click on forward or backward */
const changeData = (index: number): void => {
  music_player.style.background = `linear-gradient(45deg, ${artists[index].primary} 27%, ${artists[index].secondary} 72%)`
  title.innerHTML = artists[index].title
  artist.innerHTML =
    artists[index].artist +
    ` <a target="_blank" class="artist-link" href="${artists[index].artistLink}"><i class="fa-solid fa-link"></i></a>`
  release_date.innerHTML = artists[index].releaseDate
  description.innerHTML = artists[index].text
  album_cover.src = artists[index].img
  music.src = artists[index].music
  duration.value = '0'
}

/**Call the init function with the index */
initProject(index)

/**When the music is loaded get the duration */
music.onloadedmetadata = (): void => {
  const splitDuration = (music.duration / 60).toFixed(2).split('.')
  endtime.innerHTML = '0' + splitDuration[0] + ' : ' + splitDuration[1]
  starttime.innerHTML = '00 : 00'
}

/**When the time of the music change update the music slider */
music.ontimeupdate = (): void => {
  if (music.currentTime) {
    duration.value = ((music.currentTime / music.duration) * 100).toString()
    const splitStartTime = (music.currentTime / 60).toFixed(2).split('.')
    starttime.innerHTML = '0' + splitStartTime[0] + ' : ' + splitStartTime[1]
  }
}

/**When the music slider change it will change the music duration */
duration.onchange = (): void => {
  music.currentTime = (Number(duration.value) * music.duration) / 100
}

/**When the music is ended change the data to the next music */
music.onended = (): void => {
  index++
  changeData(index)
}

/**When the volume slider change it will change the music volume */
volume.onchange = (): void => {
  music.volume = Number(volume.value) / 100
}

/**OnClick event */
/**Detect when we click on the play-pause button */
play_pause.addEventListener('click', (): void => {
  if (music.duration > 0 && !music.paused) {
    music.pause()
  } else {
    music.play()
  }
})

/**Detect when we click on the forward button and change the data to next music */
forward.addEventListener('click', (): void => {
  if (index + 1 === artists.length) {
    index = 0
  } else {
    index++
  }
  changeData(index)
})

/**Detect when we click on the backward button and change the data to the previous music */
backward.addEventListener('click', (): void => {
  if (index - 1 === -1) {
    index = artists.length - 1
  } else {
    index--
  }
  changeData(index)
})
