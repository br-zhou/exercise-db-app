const notificationsTable = require("./../tables/NotificationsTable");

const createRoutes = (router) => {
    router.get("/notifications-table", async (req, res) => {
        const notificationContent = await notificationsTable.fetch();
        res.json(notificationContent);
    });
}

module.exports = createRoutes;