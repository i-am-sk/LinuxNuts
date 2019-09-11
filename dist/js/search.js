/* eslint-disable no-unused-vars */
(function () {
    'use strict'

    if (!window.docsearch) {
        return
    }

    var inputElement = document.getElementById('search-input')
    var siteDocsVersion = inputElement.getAttribute('data-docs-version')

    function getOrigin() {
        var location = window.location
        var origin = location.origin

        if (!origin) {
            var port = location.port ? ':' + location.port : ''

            origin = location.protocol + '//' + location.hostname + port
        }

        return origin
    }

    window.docsearch({
        apiKey: '4337133199d85e0acb3c465ee0037d3d',
        indexName: 'linuxnuts',
        inputSelector: '#search-input',
        algoliaOptions: {
            facetFilters: ['version:' + siteDocsVersion]
        },
        transformData: function (hits) {
            return hits.map(function (hit) {
                var currentUrl = getOrigin()
                var liveUrl = 'https://i-am-sk.github.io/LinuxNuts/'

                // When in production, return the result as is,
                // otherwise remove our url from it.
                // eslint-disable-next-line no-negated-condition
                hit.url = currentUrl.indexOf(liveUrl) !== -1 ?
                    hit.url :
                    hit.url.replace(liveUrl, '')

                // Prevent jumping to first header
                if (hit.anchor === 'content') {
                    hit.url = hit.url.replace(/#content$/, '')
                    hit.anchor = null
                }

                return hit
            })
        },
        // Set debug to `true` if you want to inspect the dropdown
        debug: false
    })
})()