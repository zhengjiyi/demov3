import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [{
		path: "/",
		redirect: "/home"
	},
	{
		path: "/home",
		name: "/home",
		component: () => import("@/views/Home.vue"),
		meta: { keepAlive: true, y0: 0, y1: 0, y2: 0 },
		children: [
			{
			  path: "/homeTab",
			  name: "homeTab",
			  // component: Connections,
			  meta: { keepAlive: true, y0: 0, y1: 0, y2: 0 }
			},
		],
	},
	{
		path: "/investment",
		name: "/investment",
		component: () => import("@/views/Investment.vue"),
		meta: { keepAlive: true,}
	},
	{
		path: "/find",
		name: "/find",
		component: () => import("@/views/Find.vue"),
		meta: { keepAlive: true,}
	},
	{
		path: "/user",
		name: "/user",
		component: () => import("@/views/User.vue"),
		meta: { keepAlive: true,}
	},
	{
		path: "/register",
		name: "/register",
		component: () => import("@/views/register.vue"),
		meta: { keepAlive: false,}
	},
	{
		path: "/findDetails",
		name: "/findDetails",
		component: () => import("@/views/FindDetails.vue"),
		meta: { keepAlive: false,}
	},
	{
		path: "/details",
		name: "/details",
		component: () => import("@/views/InvestmentDetails.vue"),
		meta: { keepAlive: false,}
	},
	{
<<<<<<< HEAD
		path: "/submintBp",
		name: "/submintBp",
		component: () => import("@/views/SubmintBp.vue"),
		meta: { keepAlive: false,}
	},
	
=======
		path: "/bp",
		name: "/bp",
		component: () => import("@/views/BpDetails.vue"),
		meta: { keepAlive: false,}
	},
	{
		path: "/project",
		name: "/project",
		component: () => import("@/views/MyProject.vue"),
		meta: { keepAlive: false,}
	},
	

>>>>>>> 65e431b2f88359d062453b67fd44971c214b88cc
];


const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes
});

export default router;
