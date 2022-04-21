# リダイレクト

Web上ではリダイレクトが頻繁に行われます。みなさんはすでに[twil.io/saxd](https://twil.io/saxd)などの前に短縮URLを入手しているはずです。その短縮リンクは、長く、覚えにくい別のURLへのリダイレクト(出力先を変更)に使用されます。他によく見られるリダイレクトのパターンには、ユーザーをログイン画面に送るというものがあります。

TwiMLは同じ機能を提供します。`<Redirect>`動詞を使用し、別のTwiML応答へとリダイレクトできます。

## `<Redirect>`

コードにTwiML動詞の`<Redirect>`を置くことにより、別のTwiML応答へとコントロールを即座に切り替えることができます。「即時性」を理解することは非常に_重要_です。最上位から最下位までの順番でTwiMLが発生することを思い起してください。一度`<Redirect>`が発生すると、TwiML応答の残りの部分は実行されません。

`<Redirect>`動詞の本文にて、TwiMLをホストする別のURLを指す必要があります。そのURLは完全に有効である必要があります。つまり、ドメインとパスが含まれており、`/`で始まる絶対URLであるか、現在のTwiMLファイルの相対URLでなければなりません。

この例は、ある絶対URLへのリダイレクトを示します。つまり、同じサーバー上です。

**ホストされるURL**:&nbsp;https://twimlillionaire.net/good-tunes

```xml
<Response>
    <Redirect>/sax-roll</Redirect>
    <Say>Can you hear it still?</Say>
</Response>
```

`/sax-roll`が同じサーバー上でどのようにホストされているかに注意してください。スラッシュは、これが絶対URLであり、ルートから始まることを意味します。

**ホストされるURL**:&nbsp;https://twimlillionaire.net/sax-roll

```xml
<Response>
    <Say>Have you seen Epic Sax Guy yet? Google it.</Say>
</Response>
```

元の`/good-tunes`TwiMLファイルにある`<Say>`動詞から「Can you hear it still?」は発生しません。これは、`<Redirect>`タグにヒットすると、即座にリダイレクトされるためです。

## 分かりましたか?

[**Objective**]タブに戻り、[**HACK**]パネルで正しい答えにチェックを入れられるか確認してください。