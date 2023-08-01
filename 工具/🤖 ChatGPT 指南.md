
### 我可以用来做什么？

- 生成 mock 数据。如果 AI 被训练好，就可以直接通过输入 interface 生成 mock 数据了。
- 或者通过 api 文档生出 ts interface

---
常用指令：Rephrase, Lengthen, Shorten, Explain, Pull out 5 most important keywords
形容词：以中年人的语气、以年轻人的语气、有趣活泼的、正式的

---
[提问工程师 -- 开发指南](https://github.com/wuchangming/chatgpt-query-engineer-handbook)
[黑魔法](https://github.com/del-xiong/awesome-chatgpt)
[# 🧠 Awesome ChatGPT Prompts](https://github.com/f/awesome-chatgpt-prompts)
[学会提问](https://book.douban.com/subject/35513147/)

## prompts.chat 

https://prompts.chat/
这是一个 collection of prompt examples，可以 example，然后点击 「✂️」就可将 example 复制到剪贴板中。

## 使用思路


###### 换行

>优化代码
>const hello = "🤖️ChatGPT";

###### 用 `「」` 或 `{}` 把内容圈起来

> 优化「」中的文案
>「该指南旨在帮助 `ChatGPT提问工程师` 提高提问效率」

###### ✨ 命令附加条件「重要概念」

>优化「」中的文案，扩充到 300 字
 「该指南旨在帮助 `ChatGPT提问工程师` 提高提问效率」

###### 设置回答问题的语言类型

>接下来的对话都用英文回答我

###### 设置简写

>接下来的对话，如果我发送的内容是 re ，我的意思是 重新回答这一问题

###### 继续完成回答

>继续

###### 提取大段文案的中心思想

>中心思想

###### 优化文案

>优化文案

###### 细化方案

>细化方案

###### 编写代码 - `用 {TS/JS/编程语言} 实现：{描述需要实现的功能}``

> 用 TS 实现：Vue 的双向绑定，但不能引入 Vue

###### 正则表达式 - `正则表达式：{描述需要实现的功能}`

>正则表达式：大于0的正整数

###### 评审代码

> Review code and explain in Chinese

###### 检查代码出错原因

> Check the cause of the code error and explain in Chinese

###### 重构/优化代码

> refactor the code

###### 重构代码，以 vimdiff 格式展示更改的内容，并解释更改的内容

> Refactor the code to present the changes in vimdiff format and explain the changes in Chinese

###### 生成接口文档

>Generate markdown API Chinese documentation

###### 添加单元测试

>Adding unit tests

###### 生成 Mock 数据

>Generate data in json format
	interface AComponent {
			id: string;
			name: string;
			bComponent: BComponent;
	}
	interface BComponent {
			id: string;
			name: string;
	}
