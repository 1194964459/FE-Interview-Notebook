# SaaS服务

【有道云笔记】菜单、角色、权限管理
https://share.note.youdao.com/s/AfYoonnt

VR/三维场景相关的多ToB平台开发

大团队主要做AR/VR/三维场景重建的，我们平台开发团队主要是做业务、平台相关的工作。我主要支持了给Sony大客户提供VR业务的三个平台“开放平台、运营平台、Admin平台”，支持琼宇三维场景重建平台、Admin平台中部分业务的开发。

国际化适配、导航资源UI/UX 改版、管理后台菜单/角色等权限管理；

sense Admin权限树
支持平台主线senseInception需求，管理后台菜单/角色/企业等权限管理；

Sony：导航资源 UI/UX 改版
Sony：支持Web XR Studio，给sony提供一个区别于xr magic 和 xr platform的一个独立的3D打点Demo；

## 角色菜单权限管理
RBAC（Role-Based Access Control）模型，即基于角色的访问控制模型。

用户和权限没有直接关系，通过角色来关联。给用户分配角色，给角色分配权限，这样用户间接获得权限。

一个角色可以关联多个权限，一个用户可以拥有多个角色。这样可以实现灵活的权限配置和管理，避免直接给用户分配权限带来的复杂性和冗余性。





## 标准 SaaS 模式
* 服务商维护共用系统，所有客户同步更新
* 所有客户共用一套系统，通过账号区分
* 多为 “订阅制付费”（按年/按月按账号收费）
* 功能标准化，仅支持有限配置（如开关、权限）

## Sony大客户定制化部署
* 为大客户单独部署一套系统，有独立域名，需维护这套独立系统的更新与稳定	
* 多为 “项目制付费”（一次性开发费 + 后续维护费）	
* 可根据大客户需求做深度定制（如额外加功能）	

## 模型展示
VR模型会展示吗？如果不展示的话，展示的是？

琼宇3D模型是怎么展示的？

## AR平台
重点是这个文件：packages/sense-magic/src/views/resourceConfig-3D/index.vue

【有道云笔记】sense magic 运营平台
https://share.note.youdao.com/s/YrXhJmpn

【有道云笔记】平台主线 工作梳理
https://share.note.youdao.com/s/VNKiLluw

【有道云笔记】sense Inception_ 开发平台_运营平台_admin
https://share.note.youdao.com/s/NcQAe20w

## 琼宇平台
【有道云笔记】琼宇待了解的点
https://share.note.youdao.com/s/PYuHYrSu

