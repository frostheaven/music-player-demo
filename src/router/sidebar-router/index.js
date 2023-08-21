
import findMusic_child from '../display-router/findMusic-router'
import videoRecom_child from '../display-router/videoRecom-router'
import videoDetail from '../../components/home-page/player-page/video-player/video-detail/video-detail.vue'

const route = [
    {
        //发现音乐
        name: 'find-music',
        path: 'find-music',
        redirect: 'find-music/music-recommend',
        component: () => import('../../components/home-page/sidebar-page/findMusic'),
        children:[...findMusic_child]
    },
    {
        //推荐视频
        name: 'video-recommend',
        path: 'video-recommend',
        redirect: 'video-recommend/MV',
        component: () => import('../../components/home-page/sidebar-page/videoRecom'),
        children:[...videoRecom_child]
    },
    {
        //正在放映
        name: 'video-player',
        path: 'video-player',
        component: () => import('../../components/home-page/player-page/video-player/video-player'),
        children: [
            {
                name:'video-detail',
                path: 'detail/:videoId?',
                component: videoDetail,
                meta: {
                    keepAlive: false //视频是否需要缓存，默认不缓存，在离开路由时修改为当前视频的缓存
                }
            }
        ]
    },
    {
        //每日推荐
        name: 'daily-recommend',
        path: 'daily-recommend',
        component: () => import('../../components/home-page/sidebar-page/dailyRecom')
    },
    {
        //我的收藏
        name: 'my-collection',
        path: 'my-collection',
        component: () => import('../../components/home-page/sidebar-page/myCollection')
    }

]

export default route