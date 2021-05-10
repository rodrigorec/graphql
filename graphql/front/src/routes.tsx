import DashboardPage from './pages/dashboard-page';
import ItemDetailPage from './pages/item-detail-page';
import NotFoundPage from './pages/not-found-page';

const routes = [
    {
        path: '/',
        component: <DashboardPage />,
        exact: true,
    },
    {
        path: '/item-detail/:id',
        component: <ItemDetailPage />,
        exact: true,
    },
    {
        component: <NotFoundPage />,
    },
];

export default routes;
