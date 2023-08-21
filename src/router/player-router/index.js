import musicPlayer from '../../components/home-page/player-page/music-player/music-player.vue'
import musicDetail from '../../components/home-page/player-page/music-player/music-detail/music-detail.vue'


const route = [
    {
        name: 'music-player',
        path: '/music-player',
        component: musicPlayer,
        children: [
            {
                name:'music-detail',
                path: 'detail/:musicId',
                component: musicDetail
            }
        ]
    }
]

export default route