# 多个toB项目中台登录
参考：[OAuth2.0与SSO](../Network/4.2__OAuth2.0与SSO.md)

## 登录流程
整体是login_challenge的登录方式， 通过生成临时挑战码，结合用户输入的凭证（如加密后的密码）来完成登录认证的。它构建了一套比SSO相对简化或定制化的认证流程。

也有统一的认证中心（有这些字段：iam、rbac基于角色的权限控制、Account账户），后端应该在认证中心 根据不同的项目配置了不同的clientID、登录成功后的回调页面等


1. 访问首页：https://space.sensetime.com/sensespace/

2. 由于路由中有配置`router.beforeEach(requireLogin)`，这时会基于接口请求判断用户是否已经登录？有相应的权限，若没有的话 报错401，会被Axios的resonse err拦截器命中

在Axios的响应拦截器中的错误拦截器中，`instance.interceptors.response.use(responseSuccess, responseError);`，判断error的status 是否是401，如果是的话，重定向到统一的登录页：
```js
// 琼宇主平台：VITE_BASEPATH是sensepace
location.replace(`/${import.meta.env.VITE_BASEPATH}/login?clientId=${clientId}`)

// Admin系统中：
location.replace(`/api/authn?clientId=${clientId}`)
```

3. 登录页面中：
（1）首先会检查有木有login_challenge？没有的话   进行下面的操作。
与后端认证服务交互，获取登录相关login_challenge（用于安全校验，防止重放攻击等）、重定向Url（多中台的**统一登录页，需要配置的**）

挑战码是服务端生成的一次性、临时凭证，用于后续用户提交密码时的 “安全校验”（防止重放攻击、绑定登录会话）。
```js
function initLogin(){
    const search = new URLSearchParams(location.search);
    let clientId = search.get("clientId") ?? import.meta.env.VITE_CLIENT_ID;
    const login_response = await fetch(`/api/authn?clientId=${clientId}`);
    if (login_response.url) {  // 统一登录页的地址
      login_challenge.value =
        new URLSearchParams(new URL(login_response.url).search).get("login_challenge") ??
        "";
      if (!login_challenge.value) {
        location.href = login_response.url;
        return true;
      }
    }
}
```

未登录情况下，若访问admin平台，会回调到这个统一登录页面：
https://space.sensetime.com/sensespace/login?clientId=sensespace-admin&login_challenge=351862d54cb24f978c01f771afe19703&basic_link=https://space.sensetime.com/sensespace-admin/

（2）challenge有了之后，调用下面的认证接口接口（AES加密后的password + challenge）,并且header中会携带clientId
```js
body = {
    challenge: challenge,
    remember_me: keep_login,
    account, // 用户名
    //password,
    login_code: encrypt(password, challenge, credential_type),  // 密码用AES加密，其中密钥是login_challenge
    credential_type,
};

const { redirect_url } = await oauthLogin(body);  // 登录接口
location.href = redirect_url;  //  登录成功后的回调页面
```


## 登录中用到的缓存
setCurrentIdentity()中设置，入口是在router中 beforeEach钩子

1. SessionStorage:
CURRENT_USER_ID
projectId
CURRENT_REDIRECT_ROUTE_KEY
REDIRECT_ROUTE_KEY_LIST


2. localStorage
CURRENT_USER_IDENTITY
CURRENT_USER_INSTANCE

## 其他知识
在企业级系统（尤其是多中台、ToB 场景）中，IAM、RBAC、Account 是身份与权限管理的核心概念。
1. IAM（Identity and Access Management，身份与访问管理）
核心功能：
身份管理：用户账号（Account）的全生命周期管理（创建、激活、禁用、删除）、身份认证（密码、MFA 多因素认证、SSO 单点登录等）。
权限控制：通过 RBAC、ABAC（属性基权限控制）等模型，给用户分配访问资源的权限。
集成能力：支持对接企业内部系统（AD 域、LDAP）、第三方平台（企业微信、OAuth 2.0）等。

2. RBAC（Role-Based Access Control，基于角色的权限控制）

3. Account（账号）
核心属性：
账号标识：如用户名、手机号、企业邮箱（需全局唯一）。
认证信息：如密码（加密存储）、MFA 密钥（用于二次验证）。
关联信息：所属组织（部门）、绑定角色（RBAC 中的角色）、状态（启用 / 禁用）等。

举例：zhangsan@company.com 是员工张三的账号，在 IAM 系统中被创建，关联 “研发部” 组织，并分配 “系统操作员” 角色（RBAC），通过密码 + 企业微信扫码（IAM 的认证方式）登录系统。

在多中台登录互通场景中，**IAM 负责统一账号认证（如 SSO），RBAC 负责控制账号在不同中台的操作权限，而 Account 是用户档案**。
