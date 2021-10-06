
## ComboBox with values

```
Private Sub UserForm_Initialize()
    ComboBox1.List = [A1:A6].Value
End Sub
```


## Shapes

```
Sub Shapes()
  // from http://blog.livedoor.jp/hpylky07/archives/38210071.html

    
    Dim ShpLPos As Long, ShpTPos As Long
    Dim ColNum As Long, ShpNum As Long, RPos
    Dim i As Long

    With ActiveSheet

    ColNum = 0      '
    ShpNum = 0      ' Total
    RPos = 2        '

    ShpLPos = 0     ' Left Position
    ShpTPos = 40    ' Top Position
    
    SizeWidth = 20
    
    For i = 1 To 183
        If i <> 138 Then
            ActiveSheet.Shapes.AddShape i, ShpLPos, ShpTPos, 100, 100

            ShpLPos = ShpLPos + 110
            ShpNum = ShpNum + 1
            ColNum = ColNum + 1
        
            If ColNum = 1 Then
                Cells(RPos, 1) = ShpNum & "~" & ShpNum + SizeWidth - 1
                RPos = RPos + 7
            ElseIf ColNum = SizeWidth Then
                ColNum = 0
                ShpLPos = 0
                ShpTPos = ShpTPos + 131.5
            End If
        End If
    Next

    End With

End Sub
```

## Call to GetTedScript
```

Sub s1()
    Dim id As Integer
    id = 72
    Call GetTedScript(id, "es", 1)
    Call GetTedScript(id, "en", 2)
End Sub
