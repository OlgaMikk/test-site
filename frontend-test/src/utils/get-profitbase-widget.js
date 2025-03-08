export function getProfitBaseWidget(e, link) {
    var i = e.getElementsByTagName("script")[0];
    var n = e.createElement("script");
    n.src = "https://cdn.core-t2.profitbase.pro/smart/sw.js";
    n.async = !0;
    n.onload = function () {
        if (window.profitbaseWidget) {
            window.profitbaseWidget.destroy();
        }
        window.profitbaseWidget = ProfitbaseWidget();
        window.profitbaseWidget.init({
            params: {
                host: "https://smart-catalog.profitbase.ru/eco",
                pbDomain: "profitbase.ru",
                accountId: "19236",
                referrer: "https://new.lennar.ru",
                pbApiKey: "a469436f8083d0972369e926e2a80725",
            },
            button: {
                create: true,
                link: link,
            },
        });
    };
    i.parentNode.insertBefore(n, i);
}
