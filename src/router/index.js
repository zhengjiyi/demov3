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
		 meta: { keepAlive: true,}
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

];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes
});

export default router;
