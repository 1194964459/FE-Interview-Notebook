# Git

### Git协作流程：
日常开发的核心流程，就是 “工作区 → 暂存区 → 本地仓库 → 远程仓库” 的流转：
* 你在 工作区 写代码（比如修改 index.js）；
* 用 git add . 把工作区的修改放进 暂存区（确认 “要提交的内容”）；
* 用 git commit -m "说明" 把暂存区的内容归档到 本地仓库（形成一次历史记录）；
* 用 git push 把本地仓库的历史同步到 远程仓库（供同事拉取、协作）；
* 同事用 git pull 把远程仓库的最新代码拉到自己的本地仓库，再同步到工作区编辑

## 其他几种命令
git status：查看本地工作区/暂存区有没有修改、冲突、未跟踪文件；参考的是本地仓库的最新提交（HEAD指针）

git log：查看本地仓库的所有提交记录

git stash
> git stash pop：恢复“最近一次的修改”，并删除暂存记录  
> git stash pop <提交ID>：同pop，但恢复的是某次提交ID指向的记录  
> git stash apply <提交ID>：应用某个提交ID，但不删除  
> git stash drop <提交ID>：删除  
> git stash clear：清除所有

## 如何撤回一次提交？
[git reset 与 git revert](https://github.com/febobo/web-interview/issues/230)

先用git log查看提交记录

**git reset**：reset用于回退版本，会遗弃不再使用的提交，谨慎使用；适合个人本地。
* `git reset --hard <提交ID>`：工作区、暂存区、仓库均回退到某个版本，
* `git reset --soft <提交ID>`：仅仓库回退

git revert：在当前提交后面，新增一次提交，抵消掉上一次提交导致的所有变化，不会改变过去的历史，主要是用于安全地取消过去发布的提交
适合团队远程。

## git rebase 与 git merge 的区别
git merge：*会创建一个新的合并提交*，将两个分支的提交历史合并在一起，并在提交历史中保留各自的独立性。

git rebase：不是创建新的合并提交，而是将一个分支上的所有提交“重新应用”到另一个分支上，最终形成一条线性的提交历史，而不是一个带有分支的分叉。

## git fetch 与 git pull
git pull：拉取远程分支最新代码并合并到当前本地分支（git fetch + git merge 的快捷命令）

## 某个需求做到一半，突然有个紧急项目需要处理，这时候的git操作怎样搞比较好？
* 暂存需求半成品：git stash save -u "需求A：半成品" → 工作区干净；
* 处理紧急 Bug：切 main → 拉最新 main → 建紧急分支 → 修复提交 → 推远程 → 合并到 main；
* 切回需求分支：git checkout feature/需求A；
* 同步 Bug 修复：git pull origin main（拉取含 Bug 修复的 main 代码，合并到需求分支）；
* 解决冲突（如果有）：编辑冲突文件 → git add 冲突文件 → git commit -m "解决合并冲突：整合 Bug 修复和需求代码"；
* 恢复半成品：git stash pop；
* 继续开发需求 → 正常提交推送。