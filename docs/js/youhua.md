# 性能优化

## 性能优化的方向分为以下两个方面，有助于结构化的思考与系统分析。

 1.加载性能。如何更快地把资源从服务器中拉到浏览器，如 http 与资源体积的各种优化，都是旨在加载性能的提升。

 2.渲染性能。如何更快的把资源在浏览器上进行渲染。如减少重排重绘，rIC 等都是旨在渲染性能的提升。


以用户为中心的性能指标
First Paint 首次绘制（FP）
First contentful paint 首次内容绘制 (FCP)
Largest contentful paint 最大内容绘制 (LCP)
First input delay 首次输入延迟 (FID)
Time to Interactive 可交互时间 (TTI)
Total blocking time 总阻塞时间 (TBT)
Cumulative layout shift 累积布局偏移 (CLS)