function prepTote(url) {
    function submitTote() {
        const toteForm = document.querySelector("form[action='/picklist_change_tote/set_tote']")
        const tote = document.querySelector("a[href='https:/view_tote/view_assignment?id=5186201']").innerText
        const input = document.querySelector('input[name="tote_code"]')

        input.value = tote
        toteForm.requestSubmit()

    }
    function addItemToTote() {

    }
    function isEnoughInventory(quantity) {
        const currentQuantity =() => {

        }

        return currentQuantity > quantity
    }
    function changeLinkToASIN(url, quantity) {
        chrome.storage.sync.set({"quantity": quantity})
        document.location.url = url
    }

   

    function addMissingItem() {
        const skippedItem = document.getElementsByClassName('item-status--skipped')[0]
        if (skippedItem) {
            const asinElement = skippedItem.querySelectorAll('a.a-link-normal')[1]
            const asin = asinElement.innerText
            const link = asinElement.href
            const pickListQuantity = parseInt(skippedItem.querySelectorAll('td')[4].innerText)
            const packedQuantity = parseInt(skippedItem.querySelectorAll('td')[5].innerText)
            const quantityMissing = pickListQuantity - packedQuantity

            if (quantityMissing > 0) {
                if (isEnoughInventory(quantityMissing)) {
                    changeLinkToASIN(quantityMissing)
                    addItemToTote(link)
                } else {
                    addItemToTote(link)
                }
            }

        }
    }
    const isTotePage = url => url.match('')
    const isInventoryPage = url => url.match('view_inventory_for_asin_display')

    const toteForm = document.querySelector("form[action='/picklist_change_tote/set_tote']")
    const asinForm = document.querySelector("form[action='/picklist/pack_product']")

    if(isTotePage(url)) {
        if (toteForm) {
            submitTote()
        } else if (asinForm) {
            addMissingItem()
        }
    } else if (isInventoryPage(url)){
        
    }


}
function onClickHandler() {
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
        if (changeInfo.status === 'complete' && tab.active) {
            console.dir(tab)
            prepTote(url)
        }
    })
}
chrome.contextMenus.onClicked.addListener(onClickHandler)

chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        "title": "Prep tote",
        "contexts": ["page"],
        "id": "prep_tote"
     })
})