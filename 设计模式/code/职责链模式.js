// 抽象处理者：定义处理接口和下一个处理者
class Approver {
    constructor(nextApprover) {
        this.nextApprover = nextApprover; // 下一个审批人
    }

    // 处理请假请求（子类实现具体逻辑）
    approve(leaveDays) {
        throw new Error("子类需实现审批逻辑");
    }
}

// 具体处理者1：部门主管（处理≤3天）
class Director extends Approver {
    approve(leaveDays) {
        if (leaveDays <= 3) {
            return `部门主管批准：${leaveDays}天假期`;
        }
        // 无法处理，传给下一个审批人
        return this.nextApprover?.approve(leaveDays);
    }
}

// 具体处理者2：经理（处理3-7天）
class Manager extends Approver {
    approve(leaveDays) {
        if (leaveDays > 3 && leaveDays <= 7) {
            return `经理批准：${leaveDays}天假期`;
        }
        // 无法处理，传给下一个审批人
        return this.nextApprover?.approve(leaveDays);
    }
}

// 具体处理者3：总经理（处理>7天）
class GeneralManager extends Approver {
    approve(leaveDays) {
        if (leaveDays > 7 && leaveDays <= 15) {
            return `总经理批准：${leaveDays}天假期`;
        }
        // 超出所有审批范围
        return "请假天数超出审批权限";
    }
}

// 构建职责链：主管 → 经理 → 总经理
const generalManager = new GeneralManager();
const manager = new Manager(generalManager);
const director = new Director(manager);

// 测试不同请假天数
console.log(director.approve(2));  // 部门主管批准：2天假期
console.log(director.approve(5));  // 经理批准：5天假期
console.log(director.approve(10)); // 总经理批准：10天假期
console.log(director.approve(30)); // 请假天数超出审批权限
