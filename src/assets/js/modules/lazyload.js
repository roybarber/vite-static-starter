import lozad from 'lozad'
window.lozad = lozad

// Lazy Load
window.observerImages = lozad('[data-lazyload]', {
    loaded: function(el) {
        el.classList.add('loaded')
    }
})
window.observerImages.observe()
