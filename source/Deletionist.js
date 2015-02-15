console.log('*****************');
console.log('The Deletionist, by Amaranth Borsuk, Jesper Juul, and Nick Montfort. http://thedeletionist.com');

// The Rule object has regex & name, a fitness function is added.
var Rule=function(name,regex,target){
    this.name=name;
    this.regex=regex;
    if(typeof target==='undefined'){target=150;}
    this.target=target;
};

// Returns # of matches, accounting for empty results.
String.prototype.matchCount=function(regexp){
    var matches=this.match(regexp);
    return(matches===null)?0:matches.length;
};

// Returns average length of matches, accounting for empty results.
String.prototype.matchAverageLength=function(str){
    var i,matches=this.match(str),totalLength=0;
    if(matches===null){return 0;}
    for(i=0;matches.length>i;i=i+1){
        totalLength=totalLength+matches[i].length;
    }
    return totalLength/matches.length;
};

// Calculate fitness, aiming for the specified number of matches (words or phrases).
Rule.prototype.standardFitness=function(alltext,matches){
    if(this.target>matches){return(matches*1000/this.target);}
    return(this.target*1000/matches);
};

// Facilitates overriding.
Rule.prototype.getFitness=function(alltext,matches) {
    return this.standardFitness(alltext,matches);
};

// Set up array of rules, function for adding
var rules=[];
function ar(name,regex,target){
    var r=new Rule(name,regex,target);
    rules.push(r);
    return r;
}

// Rules, alphabetically by name
var r=ar('Alliterative on A', /from|like|since|though|when|(^|\s)a[\w\u00C0-\u017F]+/ig);
r.getFitness=function(alltext,matches) {
    var standard=this.standardFitness(alltext,matches), averageLength=alltext.matchAverageLength(/\sa[\w\u00C0-\u017F]+\s/ig);
//    console.log(' A average length: ' + averageLength);
    return standard*0.9*(averageLength/5.0);
};




r=ar('Alliterative on M', /from|like|since|though|when|(^|\s)m[\w\u00C0-\u017F]+/ig);
r.getFitness=function(alltext, matches) {
    var standard=this.standardFitness(alltext,matches),averageLength=alltext.matchAverageLength(/\sm[\w\u00C0-\u017F]+\s/ig);
//    console.log(' M average length: ' + averageLength);
    return standard*0.9*(averageLength/5.0);
};



r=ar('Alliterative on S', /from|like|since|though|when|(^|\s)s[\w\u00C0-\u017F]+/ig);
r.getFitness=function(alltext, matches) {
    var standard=this.standardFitness(alltext,matches),averageLength=alltext.matchAverageLength(/\ss[\w\u00C0-\u017F]+\s/ig);
//    console.log(' S average length: ' + averageLength);
    return standard*0.9*(averageLength/5.5);
};

r=ar('Alliterative on T', /from|like|since|though|when|(^|\s)t[\w\u00C0-\u017F]+/ig);
r.getFitness=function(alltext, matches) {
    var standard=this.standardFitness(alltext, matches),averageLength=alltext.matchAverageLength(/\st[\w\u00C0-\u017F]+\s/ig);
//    console.log(' T average length: ' + averageLength);
    return standard*0.9*(averageLength/4.5);
};


r=ar('And-or catalog', /[\w\u00C0-\u017F][\w\u00C0-\u017F][\w\u00C0-\u017F\'\u2019]+\s+(and|or)|(the\s+)?worl/ig,120);
r.getFitness=function(alltext, matches) {
    var standard=this.standardFitness(alltext, matches),averageLength=alltext.matchAverageLength(/[\w\u00C0-\u017F][\w\u00C0-\u017F][\w\u00C0-\u017F\'\u2019]+\s/ig);
//    console.log(' And-or average length: ' + averageLength);
    return standard*0.9*(averageLength/10);
};

ar('Argument', /[\w\u00C0-\u017F]+\.|(We|I|Indeed|Essentially|Because|With|While|Before|Given|Thus|Therefore|Already|Nevertheless|If|As|But|And|It|Some|All|No|So|In|This|To|Finally|Perhaps|(According|Corresponding|First|Second|Third)(ly)?|Although|Though|Until)\s+[\'\u2019\w\u00C0-\u017F]+|\!|([Tt]he\s+)?[Ww]orl/g,80);

ar('Day by day', /\s[\w\u00C0-\u017F]+\s+(by|in|of|to)\s+((a|an|the|some|one)\s+)?[\w\u00C0-\u017F]+/ig);

ar('Espain', /que|es(o|to)|como|ya|\ses|\ssi|\sno/ig,80);

ar('Germanizer', /der|die|das|ich|du|wir|sie|ist|bin|bist|sind|seid|ja|nein|nicht|doch|durch|fur|gegen|ohne|wieder|um|es|ein|eine|einer|mit|sie|sei|von|und|oder|war|\?/ig);

ar('Hesitation', /eh|er|um|no|yes|yeah?|\-|[\u2012-\u2015]|(the\s+)?worl/ig);
r.getFitness=function(alltext,matches) {
    return this.standardFitness(alltext, matches)*0.9;
};

ar('I am interesting', /[\w\u00C0-\u017F]+ing\s|\si\s|am|will|was|(the\s+)?worl/ig);

r=ar('I blah blah', /\s(I[\'\u2019][\w\u00C0-\u017F]+|I)\s+[\'\u2019\w\u00C0-\u017F]+\s+[\'\u2019\w\u00C0-\u017F]+(\s+[\w\u00C0-\u017F][\w\u00C0-\u017F][\w\u00C0-\u017F][\w\u00C0-\u017F][\w\u00C0-\u017F][\w\u00C0-\u017F]+)|you\s|([Tt]he\s+)?[Ww]orl/g,50);

ar('If it is, is it? So what!', /if|it|is|so|what|\?|\!|(the\s+)?worl/ig);

ar('Inside and out', /\(|\)|\s(in|out)(side)?\s|[\w\u00C0-\u017F]+(acy|ance|ence|al|dom|ity|ty|ment|ness)\s/ig);

ar('Interjections', /aha|ah|aw|ha|oho|oh|oo|[\w\u00C0-\u017F]*ion\s|(the\s+)?worl/ig);

ar('It\'s not you it\'s me', /not|you|it\'s|it\u2019s|it\s+is|me\s|(the\s+)?worl/ig);

ar('I, you', /\si\s+[\'\u2019\w\u00C0-\u017F]+\s+[\'\u2019\w\u00C0-\u017F]+|you|but|(the\s+)?worl/ig,50);

ar('Middle bee', /[\'\u2019\w\u00C0-\u017F]+\s+be[\w\u00C0-\u017F]+\s+[\'\u2019\w\u00C0-\u017F]+|(the\s+)?worl/ig,90);

r=ar('Non-Latin alliteration', /( \u03b1[\u03ac-\u03ce\u1f00-\u1ff7]*| \u0430[\u0430-\u044f\u0450-\u045f]*| \u0561[\u0561-\u0587]*| \u05d0[\u05d0-\u05f2]*| \u0627[\u0621-\u064a\u066e-\u06df]*| \u0710[\u0710-\u074f]*| \u07cb[\u07cb-\u07ea]*| \u0d05[\u0d05-\u0d3a]*| \u0e01[\u0e01-\u0e5b]*| \u13a0[\u13a0-\u13f4]*)/ig);
r.getFitness=function(alltext) {
// #### Why not use this.standardFitness?
    var matches=alltext.matchCount(this.regex);
    this.matches=matches;
    return matches/0.04;
};

ar('Party on', /\sthe\s+[\'\u2019\w\u00C0-\u017F]+y\s|[\'\u2019\w\u00C0-\u017F]+\s+on\s|(the\s+)?worl/ig,120);

r=ar('Poetic O', /o\s+((a|an|the|some|one|this|his|her|their|who|what|my|your|our|their)\s+)?[\'\u2019\w\u00C0-\u017F]+|(the\s+)?worl/ig);
r.getFitness=function(alltext, matches) {
    return this.standardFitness(alltext, matches)*1.2;
};

ar('Possessive', /(your|my|our|his|her|their)\s+[\w\u00C0-\u017F]+(\s+(and|or|with|are|is|has|was|who|which|that))?/ig);

r=ar('Sound of music', /do|re|mi|fa|so|la|ti|(the\s+)?worl/ig);
r.getFitness=function(alltext,matches) {
    return this.standardFitness(alltext, matches)*0.8;
};

ar('Steinian continuous present', /(one|I) was|they were|was|were|to be|there|then|[\w\u00C0-\u017F]*ing\s|(the\s+)?worl/ig);

r=ar('Strictly alliterative on K', /\sk[\w\u00C0-\u017F]+\s/ig);
r.getFitness=function(alltext, matches) {
    var standard=this.standardFitness(alltext, matches),averageLength=alltext.matchAverageLength(/\sk[\w\u00C0-\u017F]+\s/ig);
    console.log(' K average length: ' + averageLength);
    return standard*(averageLength/5.0);
};


r=ar('Strictly alliterative on N', /\sn[\w\u00C0-\u017F]+\s/ig);
r.getFitness=function(alltext, matches) {
    var standard=this.standardFitness(alltext, matches),averageLength=alltext.matchAverageLength(/\sn[\w\u00C0-\u017F]+\s/ig);
    console.log(' N average length: ' + averageLength);
    return standard*(averageLength/4.25);
};
valg=r;
r=ar('Tears in rain', /[\'\u0021-\u002f]+/g);
r.getFitness=function(alltext) { return 50; };

ar('Tis oft', /tis|oft|\s[\w\u00C0-\u017F]+(\w)\1ed\s|(the\s+)?worl/g);

r=ar('To be or not', /(to|be|\sor\s|not|\?)|(the\s+)?worl/ig);
r.getFitness=function(alltext,matches) {
    return this.standardFitness(alltext, matches)*1.1;
};

ar('Wondering', /[\w\u00C0-\u017F]+(ish|less|ly)\s|[\'\u2019\w\u00C0-\u017F]+\?|(the\s+)?worl/ig);

var start=new Date();

// Make a string with all the text in the page.
var alltext='';
var elements=getArrayByTagName(document,'*'),i,j,e,child;
for (i=0;elements.length>i;i=i+1) {
    e=elements[i];
    e.normalize();
    if((e.tagName.toLowerCase()=='script')||(e.tagName.toLowerCase()=='style')) {
        continue;
    }
    // Loop through all child nodes.
    for (j=0;e.childNodes.length>j;j=j+1) {
        child=e.childNodes[j];
        if(child.nodeType==3){
            if(child.data.length>0){
                if(0>child.textContent.indexOf('!--')){
                    alltext=alltext+child.data;
                }
            }
        }
    }
}

console.log('Time to construct alltext string: '+(new Date().getTime()-start.getTime()));
console.log('Text length is '+alltext.length);
start=new Date();

// Find best fitting rule.
var best=0,i,chosen,fitness,matches;
for (i=0;rules.length>i;i=i+1){
    matches=alltext.matchCount(rules[i].regex);
    fitness=rules[i].getFitness(alltext,matches);
    console.log(rules[i].name + ': ' + matches + ' matches, fitness ' + fitness);
    if(fitness>best){
        best=fitness;
        chosen=rules[i];
    }
}

chosen=valg;
console.log('SELECTED: ' + chosen.name + ', with fitness ' + best);
var re=chosen.regex;

//re=test.regex;
//console.log('USING: ' + test.name);

console.log('Time used considering the ' + rules.length + ' rules: ' + (new Date().getTime() - start.getTime()));
start=new Date();

// Now start parsing.
function getArrayByTagName(node,tag){
    var nodes=node.getElementsByTagName(tag),to_return=[],i;
    for(i=0;nodes.length>i;i=i+1){
        to_return.push(nodes[i]);
    }
    return to_return;
}

// This now uses the static array rather than a NodeList.
// It doesn't change as the document is updated.
var pre,post,pretext,keeptext,posttext,discard,retain,rest;

for (i=0;elements.length>i;i=i+1){
    e=elements[i];
    var tag=e.tagName.toLowerCase();
    if((tag=='ol')||(tag=='ul')){
        e.style.listStyle='none none';
        e.style.listStyleType='none';
    }
    if((tag=='script')||(tag=='style')){
        continue;
    }
    // Loop through all child nodes.
    for (j=0;e.childNodes.length>j;j=j+1){
        child=e.childNodes[j];
        if(child.nodeType==3){
            if(child.data.length>0){
                if(0>child.textContent.indexOf('!--')){
                    retain=child.data.match(re);
                    if(retain===null) {
                        pretext=child.data;
                        keeptext='';
                        posttext='';
                    } else {
                        keeptext=retain[0];
                        discard=child.data.split(keeptext);
                        pretext=discard.shift();
                        rest=child.data.indexOf(keeptext) + keeptext.length;
                        posttext=child.data.substring(rest);
                        if(posttext===null){throw new Error(discard.length);}
                    }
                    child.replaceData(0,child.data.length,keeptext);
                    if(pretext.length>0){
                        pre=document.createElement('span');
                        pre.appendChild(document.createTextNode(pretext));
                        pre.style.color="transparent";
                        e.insertBefore(pre,child);
                    }
                    if(posttext.length>0){
                        post=document.createElement('span');
                        post.appendChild(document.createTextNode(posttext));
                        e.insertBefore(post,child.nextSibling);
                        elements.push(post);
                    }
                }
            }
        }
    }
}

console.log('Time used processing text: ' + (new Date().getTime() - start.getTime()));

