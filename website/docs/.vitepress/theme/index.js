import { h } from 'vue';
import DefaultTheme from 'vitepress/theme';
import BezierDemo from './components/BezierDemo.vue';
import ClampDemo from './components/ClampDemo.vue';
import CubicBezierDemo from './components/CubicBezierDemo.vue';
import GameOfLife from './components/GameOfLife.vue';
import GridDemo from './components/GridDemo.vue';
import LerpDemo from './components/LerpDemo.vue';
import QuatDemo from './components/QuatDemo.vue';
import RandDemo from './components/RandDemo.vue';
import RandScatterDemo from './components/RandScatterDemo.vue';
import SpockLogo from './components/SpockLogo.vue';
import TransformDemo from './components/TransformDemo.vue';
import TrigoDemo from './components/TrigoDemo.vue';
import UtilsDemo from './components/UtilsDemo.vue';
import WaveDemo from './components/WaveDemo.vue';
import RollingAverageDemo from './components/RollingAverageDemo.vue';
import CircDemo from './components/CircDemo.vue';
import Vec3Demo from './components/Vec3Demo.vue';
import Mat4Demo from './components/Mat4Demo.vue';
import Mat4x3Demo from './components/Mat4x3Demo.vue';
import NumArrayDemo from './components/NumArrayDemo.vue';
import TimeDemo from './components/TimeDemo.vue';
import './demo.css';

export default {
  extends: DefaultTheme,
  // the homepage mark is the library drawing itself, so it stands in for the hero image
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'home-hero-image': () => h(SpockLogo),
    });
  },
  enhanceApp({ app }) {
    app.component('BezierDemo', BezierDemo);
    app.component('ClampDemo', ClampDemo);
    app.component('CubicBezierDemo', CubicBezierDemo);
    app.component('GameOfLife', GameOfLife);
    app.component('GridDemo', GridDemo);
    app.component('LerpDemo', LerpDemo);
    app.component('QuatDemo', QuatDemo);
    app.component('RandDemo', RandDemo);
    app.component('RandScatterDemo', RandScatterDemo);
    app.component('TransformDemo', TransformDemo);
    app.component('TrigoDemo', TrigoDemo);
    app.component('UtilsDemo', UtilsDemo);
    app.component('WaveDemo', WaveDemo);
    app.component('RollingAverageDemo', RollingAverageDemo);
    app.component('CircDemo', CircDemo);
    app.component('Vec3Demo', Vec3Demo);
    app.component('Mat4Demo', Mat4Demo);
    app.component('Mat4x3Demo', Mat4x3Demo);
    app.component('NumArrayDemo', NumArrayDemo);
    app.component('TimeDemo', TimeDemo);
  },
};
