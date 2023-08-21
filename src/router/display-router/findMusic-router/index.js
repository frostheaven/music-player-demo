//发现音乐-子集
//个性推荐
import musicRecom from '../../../components/home-page/display-page/find-music/musicRecom.vue'
//歌单
import musicMenu from '../../../components/home-page/display-page/find-music/musicMenu'
//排行榜
import rankList from '../../../components/home-page/display-page/find-music/rankList'
//歌手
import singer from '../../../components/home-page/display-page/find-music/singer'
//最新音乐
import latestMusic from '../../../components/home-page/display-page/find-music/latestMusic'

const route = [
    {
        name: 'music-recommend',
        path: 'music-recommend',
        component: musicRecom
    },
    {
        name: 'music-menu',
        path: 'music-menu',
        component: musicMenu
    },
    {
        name:'rank-list',
        path: 'rank-list',
        component: rankList
    },
    {
        name: 'singer',
        path: 'singer',
        component: singer
    },
    {
        name: 'latest-music',
        path: 'latest-music',
        component: latestMusic
    }
]

export default route