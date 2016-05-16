// Magic Wand (Fuzzy Selection Tool) for Javascript
//
// The MIT License (MIT)
//
// Copyright (c) 2014, Ryasnoy Paul (ryasnoypaul@gmail.com)
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
MagicWand=function(){var a={};a.floodFill=function(m,z,B,d,A){var a,j,i,b,g,f,l,p,q,u,e=m.data,n=m.width,r=m.height,t=m.bytes,v=-1,x=n+1,w=-1,y=r+1,c=B*n+z,s=new Uint8Array(n*r),k=new Uint8Array(A?A:n*r);if(k[c]===1)return null;c=c*t;var h=[e[c],e[c+1],e[c+2],e[c+3]],o=[{y:B,left:z-1,right:z+1,dir:1}];do{b=o.shift();u=false;for(j=b.left+1;j<b.right;j++){l=b.y*n;c=(l+j)*t;if(k[l+j]===1)continue;
	a=e[c]-h[0];
	if(a>d||a<-d)continue;
	a=e[c+1]-h[1];
	if(a>d||a<-d)continue;
	a=e[c+2]-h[2];
	if(a>d||a<-d)continue;
	a=e[c+3] - h[3];
	if(a>d||a<-d)continue;
	u=true;s[l+j]=1;
	k[l+j]=1;
	f=j-1;
	while(f>-1){
		p=l+f;
		c=p*t;
		if(k[p]===1)break;
		a=e[c]-h[0];
		if(a>d||a<-d)break;
		a=e[c+1]-h[1];
		if(a>d||a<-d)break;
		a=e[c+2]-h[2];
		if(a>d||a<-d)break;
		a=e[c+3] - h[3];
		if(a>d||a<-d)break;
		s[p]=1;k[p]=1;f--}g=j+1;while(g<n){q=l+g;c=q*t;if(k[q]===1)break;
			a=e[c]-h[0];
			if(a>d||a<-d)break;
			a=e[c+1]-h[1];
			if(a>d||a<-d)break;
			a=e[c+2]-h[2];
			if(a>d||a<-d)break;
			a=e[c+3] - h[3];
			if(a>d||a<-d)break;
			s[q]=1;k[q]=1;g++}if(f<x)x=f+1;if(g>v)v=g-1;i=b.y-b.dir;if(i>=0&&i<r){f<b.left&&o.push({y:i,left:f,right:b.left,dir:-b.dir});b.right<g&&o.push({y:i,left:b.right,right:g,dir:-b.dir})}i=b.y+b.dir;if(i>=0&&i<r)f<g&&o.push({y:i,left:f,right:g,dir:b.dir})}if(u){if(b.y<y)y=b.y;if(b.y>w)w=b.y}}while(o.length>0);return{data:s,width:m.width,height:m.height,bounds:{minX:x,minY:y,maxX:v,maxY:w}}};a.gaussBlur=function(e,b){for(var m,l,c,d,k,i,j,f=b*2+1,x=b*b,h=new Float32Array(f),p=0,g=e.width,n=e.height,q=e.data,v=e.bounds.minX,t=e.bounds.maxX,w=e.bounds.minY,u=e.bounds.maxY,a=0;a<b;a++){var z=(b-a)*(b-a),y=Math.exp(-z/(2*x))/(2*Math.PI*x);h[b+a]=h[b-a]=y;p+=2*y}for(a=0;a<f;a++)h[a]/=p;var o=new Uint8Array(g*n),r=b+g,s=b+n;for(d=w;d<u+1;d++)for(c=v;c<t+1;c++){k=0;m=d*g+c;i=b-c>0?b-c:0;j=r-c<f?r-c:f;l=m-b;for(a=i;a<j;a++)k+=q[l+a]*h[a];i=b-d>0?b-d:0;j=s-d<f?s-d:f;l=m-b*g;for(a=i;a<j;a++)k+=q[l+a*g]*h[a];o[m]=k>.5?1:0}return{data:o,width:g,height:n,bounds:{minX:v,minY:w,maxX:t,maxY:u}}};function b(k,g,y){var a,i,w,c,b,h,e,d=k.width,v=k.height,l=k.data,f=new Uint8Array(l),r=k.bounds.minX,m=k.bounds.maxX,s=k.bounds.minY,n=k.bounds.maxY,u=d*v,o=new Uint8Array(u),j=[],B=Math.max(r,1),C=Math.min(m,d-2),D=Math.max(s,1),E=Math.min(n,v-2);if(y&&y.length>0)for(b=0;b<u;b++)if(y[b]===1)f[b]=1;for(c=D;c<E+1;c++)for(a=B;a<C+1;a++){b=c*d+a;if(l[b]===0)continue;h=b+d;e=b-d;(f[b+1]===0||f[b-1]===0||f[h]===0||f[h+1]===0||f[h-1]===0||f[e]===0||f[e+1]===0||f[e-1]===0)&&j.push(b)}if(r==0)for(c=s;c<n+1;c++)l[c*d]===1&&j.push(c*d);if(m==d-1)for(c=s;c<n+1;c++)l[c*d+m]===1&&j.push(c*d+m);if(s==0)for(a=r;a<m+1;a++)l[a]===1&&j.push(a);if(n==v-1)for(a=r;a<m+1;a++)l[n*d+a]===1&&j.push(n*d+a);var p=[],q,t,z=g+d,A=g+v,x=g*2+1;u=j.length;for(w=0;w<u;w++){b=j[w];o[b]=1;p.push(b);a=b%d;c=(b-a)/d;q=g-a>0?g-a:0;t=z-a<x?z-a:x;h=b-g;for(i=q;i<t;i++){e=h+i;if(o[e]===0){o[e]=1;p.push(e)}}q=g-c>0?g-c:0;t=A-c<x?A-c:x;h=b-g*d;for(i=q;i<t;i++){e=h+i*d;if(o[e]===0){o[e]=1;p.push(e)}}}return p}a.gaussBlurOnlyBorder=function(g,a,C){for(var w=b(g,a,C),v,A,f,h,t,d,e,o,r,s,i=a*2+1,E=2*a*a,p=new Float32Array(i),x=0,j=g.width,B=g.height,u=g.data,m=g.bounds.minX,k=g.bounds.maxX,n=g.bounds.minY,l=g.bounds.maxY,D=w.length,c=0;c<a;c++){A=(a-c)*(a-c);v=Math.exp(-A/E)/Math.PI;p[a+c]=p[a-c]=v;x+=2*v}for(c=0;c<i;c++)p[c]/=x;var q=new Uint8Array(u),y=a+j,z=a+B;for(c=0;c<D;c++){h=w[c];o=0;d=h%j;e=(h-d)/j;r=a-d>0?a-d:0;s=y-d<i?y-d:i;t=h-a;for(f=r;f<s;f++)o+=u[t+f]*p[f];if(o>.5){q[h]=1;if(d<m)m=d;if(d>k)k=d;if(e<n)n=e;if(e>l)l=e;continue}r=a-e>0?a-e:0;s=z-e<i?z-e:i;t=h-a*j;for(f=r;f<s;f++)o+=u[t+f*j]*p[f];if(o>.5){q[h]=1;if(d<m)m=d;if(d>k)k=d;if(e<n)n=e;if(e>l)l=e}else q[h]=0}return{data:q,width:j,height:B,bounds:{minX:m,minY:n,maxX:k,maxY:l}}};a.createBorderMask=function(g){for(var a,l,m,n,f=g.width,p=g.height,c=g.data,d=g.bounds.minX,h=g.bounds.maxX,e=g.bounds.minY,i=g.bounds.maxY,k=h-d+1,o=i-e+1,j=new Uint8Array(k*o),q=Math.max(d,1),r=Math.min(h,f-2),s=Math.max(e,1),t=Math.min(i,p-2),b=s;b<t+1;b++)for(a=q;a<r+1;a++){l=b*f+a;if(c[l]===0)continue;m=l+f;n=l-f;if(c[l+1]===0||c[l-1]===0||c[m]===0||c[m+1]===0||c[m-1]===0||c[n]===0||c[n+1]===0||c[n-1]===0)j[(b-e)*k+(a-d)]=1}if(d==0)for(b=e;b<i+1;b++)if(c[b*f]===1)j[(b-e)*k]=1;if(h==f-1)for(b=e;b<i+1;b++)if(c[b*f+h]===1)j[(b-e)*k+(h-d)]=1;if(e==0)for(a=d;a<h+1;a++)if(c[a]===1)j[a-d]=1;if(i==p-1)for(a=d;a<h+1;a++)if(c[i*f+a]===1)j[(i-e)*k+(a-d)]=1;return{data:j,width:k,height:o,offset:{x:d,y:e}}};a.getBorderIndices=function(j){for(var a,c,g,h,e=j.width,i=j.height,b=j.data,f=[],k=e-1,l=i-1,d=1;d<l;d++)for(a=1;a<k;a++){c=d*e+a;if(b[c]===0)continue;g=c+e;h=c-e;(b[c+1]===0||b[c-1]===0||b[g]===0||b[g+1]===0||b[g-1]===0||b[h]===0||b[h+1]===0||b[h-1]===0)&&f.push(c)}for(d=0;d<i;d++)b[d*e]===1&&f.push(d*e);for(a=0;a<e;a++)b[a]===1&&f.push(a);c=e-1;for(d=0;d<i;d++)b[d*e+c]===1&&f.push(d*e+c);c=(i-1)*e;for(a=0;a<e;a++)b[c+a]===1&&f.push(c+a);return f};function c(a){for(var b,l=a.width,k=a.data,c=a.bounds.minX,h=a.bounds.maxX,d=a.bounds.minY,i=a.bounds.maxY,f=h-c+3,j=i-d+3,g=new Uint8Array(f*j),e=d;e<i+1;e++)for(b=c;b<h+1;b++)if(k[e*l+b]===1)g[(e-d+1)*f+(b-c+1)]=1;return{data:g,width:f,height:j,offset:{x:c-1,y:d-1}}}a.traceContours=function(A){for(var j=c(A),v=[],l=0,d=j.width,y=d*2,B=j.height,n=j.data,w=j.offset.x,x=j.offset.y,m=new Uint8Array(n),g,u,k,q,o,p,s,f,i,h,a,e,b,t,z=[[1,0],[1,1],[0,1],[-1,1],[-1,0],[-1,-1],[0,-1],[1,-1]],r=1;r<B-1;r++)for(k=1;k<d-1;k++){q=r*d+k;if(n[q]===1)for(g=-d;g<y;g+=y)if(n[q+g]===0&&m[q+g]===0){s=g===d;l++;p=[];f=s?2:6;a=e=i={x:k,y:r};h=null;while(true){m[a.y*d+a.x]=l;for(u=0;u<8;u++){f=(f+1)%8;t=z[f];b={x:a.x+t[0],y:a.y+t[1]};o=b.y*d+b.x;if(n[o]===1){m[o]=l;break}m[o]=-1;b=null}if(b===null)break;a=b;if(h){if(e.x===i.x&&e.y===i.y&&a.x===h.x&&a.y===h.y)break}else h=b;p.push({x:e.x+w,y:e.y+x});e=a;f=(f+4)%8}if(b!=null){p.push({x:i.x+w,y:i.y+x});v.push({inner:s,label:l,points:p})}}}return v};a.simplifyContours=function(w,x,y){for(var z=w.length,u=[],s,d,g,e,f,k,l,n,a,t,p,o,q,r,m,b,c,i,h,j,v=0;v<z;v++){g=w[v];e=g.points;f=g.points.length;if(f<y){k=[];for(d=0;d<f;d++)k.push({x:e[d].x,y:e[d].y});u.push({inner:g.inner,label:g.label,points:k,initialCount:f});continue}l=[0,f-1];n=[{first:0,last:f-1}];do{a=n.shift();if(a.last<=a.first+1)continue;t=-1;p=a.first;for(s=a.first+1;s<a.last;s++){i=e[s];h=e[a.first];j=e[a.last];b=i.x-h.x;c=i.y-h.y;q=Math.sqrt(b*b+c*c);b=i.x-j.x;c=i.y-j.y;r=Math.sqrt(b*b+c*c);b=h.x-j.x;c=h.y-j.y;m=Math.sqrt(b*b+c*c);if(q>=Math.sqrt(r*r+m*m))o=r;else if(r>=Math.sqrt(q*q+m*m))o=q;else o=Math.abs((c*i.x-b*i.y+h.x*j.y-j.x*h.y)/m);if(o>t){p=s;t=o}}if(t>x){l.push(p);n.push({first:a.first,last:p});n.push({first:p,last:a.last})}}while(n.length>0);k=[];f=l.length;l.sort(function(a,b){return a-b});for(d=0;d<f;d++)k.push({x:e[l[d]].x,y:e[l[d]].y});u.push({inner:g.inner,label:g.label,points:k,initialCount:g.points.length})}return u};return a}();