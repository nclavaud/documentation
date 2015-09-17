requirejs([
  'jquery.ba-hashchange.min',
  'jquery.swiftype.autocomplete',
  'jquery.swiftype.search',
  'highlight.pack',
  'highlight',
  'search'
  ], function() {

    if (window.location.pathname !== '/404.html' && document.title.indexOf('404 Not found') == -1) {
      var sidebar_nav = $('.sidebar-nav')
      var headers = $('.content').find(':header:not(h1)')
      var ul = $('<ul>').addClass('list-unstyled')

      headers.each(function (index, el) {
        // make id from cotent
        var id = slugify(el.innerText)

        // inject id
        el.id = id

        var a = $('<a>')
          .attr('href','#' + id)
          .text(el.innerText)

        var li = $('<li>')
          .append(a)

        ul.append(li)
      })

      sidebar_nav.prepend(ul)
      sidebar_nav.prepend('<strong>Table of Content<strong>')
    }

})

function slugify(s) {
  return s
      .toLowerCase()
      .replace(/[^\w ]+/g,'')
      .replace(/ +/g,'-')
}