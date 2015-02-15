# Deletionist
The Deletionist

The Deletionist is a concise system for automatically producing an erasure poem from any Web page. It systematically removes text to uncover poems, discovering a network of poems called “the Worl” within the World Wide Web.


# How The Deletionist Works

The system reads and removes standard Web page text, but does not remove a few special classes of text, including text within image, within a canvas, within an iFrame, and on buttons.

The system is deterministic — there is no random element. The Deletionist chooses a method of erasure based on the properties of the Web page. So, for static pages, you can share a particular result with others by simply sharing the URL, and their loading the page, as with your reloading it, will produce the same result. However, if the page changes, the system may change its method of erasure.

The Deletionist works to make every page into a single poem. If the words that result are spread too thinly over a very long page (such as one that contains the text of an entire novel), try applying The Deletionist to a smaller excerpt of this text, such as a chapter.

Some pages can load extra content after the main page has loaded — Facebook and Twitter, for instance. Anything that has been loaded after The Deletionist has done its work will not be erased into a poem unless you click on The Deletionist again.

Some pages use this type of dynamic text loading, or other special means of displaying text, for everything. Many of Google's pages, including Google search results and Google News, are of this sort, and The Deletionist will not work on them.

# How to use
Please visit http://thedeletionist.com/ for an easily installable bookmarklet.

#How to build
Fork this repository for your own experimentation.

We recommend using Scratchpad in Firefox for development.

In order to convert the existing code to bookmarklet form, please use a tool for compacting javascript. Beware: most tools have their own quircks, so there is as of now no fully automated way to convert the regular javascript code to bookmarklet all.


#About
The Deletionist was developed by Amaranth Borsuk, Jesper Juul and Nick Montfort.
It is licenced under at GPL v2 license.
