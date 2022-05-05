Please see [Button](https://ant.design/components/button-cn/) in the antd documentation for details.

# Button 按钮

# Description

按钮用于开始一个即时操作。
To trigger an operation.

# Typical usage scenario 功能使用

标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。
根据 Ant Design 我们提供了五种按钮。
主按钮：用于主行动点，一个操作区域只能有一个主按钮。
默认按钮：用于没有主次之分的一组行动点。
虚线按钮：常用于添加操作。
文本按钮：用于最次级的行动点。
链接按钮：一般用于链接，即导航至某位置。
以及四种状态属性与上面配合使用。
危险：删除/移动/修改权限等危险操作，一般需要二次确认。
幽灵：用于背景色比较复杂的地方，常用在首页/产品页等展示场景。
禁用：行动点不可用的时候，一般需要文案解释。
加载中：用于异步操作等待反馈的时候，也可以避免多次提交。
A button means an operation (or a series of operations). Clicking a button will trigger corresponding business logic.
According to Ant Design we provide 5 types of button.
Primary button: indicate the main action, one primary button at most in one section.
Default button: indicate a series of actions without priority.
Dashed button: used for adding action commonly.
Text button: used for the most secondary action.
Link button: used for external links.
And 4 other properties additionally.
danger: used for actions of risk, like deletion or authorization.
ghost: used in situations with complex background, home pages usually.
disabled: when actions are not available.
loading: add loading spinner in button, avoiding multiple submits too.

# Features

Configurable permissions
Set color
Pop-up window can be set
Settable type

# Limitations

None

# Dependencies

The design style depends on AntDesign [Button](https://ant.design/components/button-cn/).
Please see Configure Your Theme in the mendix documentation for how to import antd css.

```
{
    "cssFiles": ["theme.compiled.css","https://cdn.bootcdn.net/ajax/libs/antd/4.15.6/antd.min.css"]
}

```

# Installation

Place the widget in your page. Configure the data source, columns you want to show. Configure column capabilities. Refer Screens

# Configuration

Refer Screens. The configurations are straight forward and simple.

# Known bugs

None
