//搜索-子集
//单曲
import singleSong from '../../components/home-page/search-page/search-detail/search-singleSong'
//专辑
import album from '../../components/home-page/search-page/search-detail/search-album'
//歌手
import singer from '../../components/home-page/search-page/search-detail/search-singer'
//歌单
import musicMenu from '../../components/home-page/search-page/search-detail/search-musicMenu'
//MV
import mv from '../../components/home-page/search-page/search-detail/search-mv'
//视频
import video from '../../components/home-page/search-page/search-detail/search-video'

const route = [
    {
        name: 'search-single-song',
        path: 'search-single-song',
        component: singleSong
    },
    {
        name: 'search-album',
        path: 'search-album',
        component: album
    },
    {
        name:'search-singer',
        path: 'search-singer',
        component: singer
    },
    {
        name: 'search-music-menu',
        path: 'search-music-menu',
        component: musicMenu
    },
    {
        name: 'search-mv',
        path: 'search-mv',
        component: mv
    },
    {
        name: 'search-video',
        path: 'search-video',
        component: video
    }
]

export default route