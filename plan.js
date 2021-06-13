    const listOfMissingItemElements = document.getElementsByClassName('item-status--skipped')
    for (const missingItemElement of listOfMissingItemElements) {
        const tableInformation = missingItemElement.getElementsByTagName('td')
        const asin = tableInformation[1]
        const requiredQuantity = tableInformation[4]
        const packedQuantity = tableInformation[5]
        const asinUrl = asin.href
        const needed = requiredQuantity - packedQuantity

        chrome.storage.set({needed: needed})
        document.location = asinUrl
    }
}