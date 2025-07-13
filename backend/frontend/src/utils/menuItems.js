import { transactions, trend, expenses, dashboard } from './icons';
export const menuItems = [
    {
        id: 1,
        title: 'Dashboard',
        icon: dashboard,
        link: '/dashboard'
    },
    {
        id: 2,
        title: 'Cashflow',
        icon: transactions,
        link: '/cashflow',
    },
    {
        id: 3,
        title: 'Incomes',
        icon: trend,
        link: '/dashboard'
    },
        {
        id: 4,
        title: 'Expenses',
        icon: expenses,
        link: '/dashboard'
    }
]