import { UploadOutlined } from '@ant-design/icons'
import { apiGetCMSStsCredential } from '@keukenhof/api'
import { sliceUploadFile as uploadtest } from '@keukenhof/server'
import { Button, message, Progress, Space, Upload } from 'antd'
import 'antd/dist/antd.css'
import * as PIXI from 'pixi.js'
import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import './style.less'

window.PIXI = PIXI

const sliceUploadFile = uploadtest(apiGetCMSStsCredential)

interface UploadProps {
  path: string
  value?: any
  onChange?: (data: any) => void
  [key: string]: any
}

const UploadFile: React.FC<UploadProps> = React.forwardRef(
  ({ path, value = {}, onChange, ...uploadProps }: UploadProps, ref) => {
    const [uploadProgressData, setUploadProgressData] = useState<any>()
    const [uploading, setUploading] = useState(false)
    const cancelTask = useRef<Function>()

    /** 上传文件 */
    const beforeUpload = async (file: File) => {
      const cosKey = `${path}/${file.name}`
      const onProgress = (progressData: any) => {
        setUploadProgressData(progressData)
      }

      setUploading(true)
      const onUpload = (err: Error, data: any) => {
        //UI效果：延迟消失
        setTimeout(() => {
          setUploading(false)
        }, 500)

        if (data && onChange) {
          onChange({ name: file.name, ...data })
        } else {
          message.error('上传失败')
        }
      }

      cancelTask.current = await sliceUploadFile(
        { path, file, cosKey, onProgress },
        onUpload
      )
    }

    const handleCancel = () => {
      cancelTask.current && cancelTask.current()
    }

    return (
      // @ts-ignore
      <div ref={ref}>
        <Upload {...uploadProps} beforeUpload={beforeUpload}>
          <Button size="small" icon={<UploadOutlined />}>
            上传
          </Button>
        </Upload>
        {uploading && (
          <Space>
            <div style={{ width: 100 }}>
              <Progress
                percent={(uploadProgressData?.percent || 0) * 100}
                size="small"
              />
            </div>
            <Button size="small" onClick={handleCancel}>
              取消上传
            </Button>
          </Space>
        )}
      </div>
    )
  }
)

enum Action {
  'jump' = 119, // W
  'crouch' = 115, // S
  'defense' = 97, // A
  'attack' = 100, // D
}

const makeCommand = function (receiver: any, state: Action) {
  // 创建命令
  return receiver[state]
}

const commands = {
  '119': 'jump', // W
  '115': 'crouch', // S
  '97': 'defense', // A
  '100': 'attack', // D
}

const CommandDemo = () => {
  const app = new PIXI.Application()
  const appRef = useRef<HTMLDivElement>(null)
  const [commandStack, setCommandStack] = useState<any[]>([])
  const [actionDec, setActionDec] = useState<string>('')
  const [style, setStyle] = useState<any>({
    left: 0,
    width: 10,
    top: 0,
    height: 10,
  })

  const Ryu = {
    [Action.attack]: function () {
      console.log('攻击')
      setStyle({ ...style, left: style.left + 50 })
    },
    [Action.defense]: function () {
      console.log('防御')
      setStyle({ ...style, width: style.width + 50 })
    },
    [Action.jump]: function () {
      console.log('跳跃')
      setStyle({ ...style, top: style.top + 50 })
    },
    [Action.crouch]: function () {
      console.log('蹲下')
      setStyle({ ...style, height: style.height + 50 })
    },
  }
  useEffect(() => {
    appRef.current?.appendChild(app.view)

    import('pixi-spine').then(() => {
      // load spine data
      app.loader
        .add(
          'spineboypro',
          'https://pixijs.io/examples/examples/assets/pixi-spine/spineboy-pro.json'
        )
        .load(onAssetsLoaded)

      app.stage.interactive = true

      function onAssetsLoaded(loader, res) {
        console.log(
          '🚀 ~ file: index.tsx ~ line 149 ~ onAssetsLoaded ~ res',
          res
        )
        // create a spine boy
        const spineBoyPro = new PIXI.spine.Spine(res.spineboypro.data)

        // set the position
        spineBoyPro.x = app.screen.width / 2
        spineBoyPro.y = app.screen.height

        spineBoyPro.scale.set(0.5)

        app.stage.addChild(spineBoyPro)

        const singleAnimations = ['aim', 'death', 'jump', 'portal']
        const loopAnimations = ['hoverboard', 'idle', 'run', 'shoot', 'walk']
        const allAnimations = [...singleAnimations, ...loopAnimations]

        let lastAnimation = ''

        // Press the screen to play a random animation
        app.stage.on('pointerdown', () => {
          let animation = ''
          do {
            animation =
              allAnimations[Math.floor(Math.random() * allAnimations.length)]
          } while (animation === lastAnimation)

          spineBoyPro.state.setAnimation(
            0,
            animation,
            loopAnimations.includes(animation)
          )

          lastAnimation = animation
        })
      }
    })
  }, [])

  useEffect(() => {
    document.onkeypress = function (ev) {
      var keyCode = ev.keyCode,
        command = makeCommand(Ryu, keyCode)
      if (command) {
        command() // 执行命令
        const commandInfo = {
          name: Action[keyCode],
          command,
          time: new Date().valueOf(),
        }
        setCommandStack([...commandStack, commandInfo])
      }
    }
  }, [commandStack])

  const handleReplay = async () => {
    const delay = (timer: number) =>
      new Promise((resolve) =>
        setTimeout(() => {
          resolve('done')
        }, timer)
      )

    let txt = ''
    let time = commandStack[0].time
    for (let action of commandStack) {
      action.command()
      txt += `${action.time}--${action.name} \n`
      setActionDec(txt)
      await delay(action.time - time)
      time = action.time
    }
  }

  return (
    <div>
      <div ref={appRef}></div>
      <div className="wrap">
        <button onClick={handleReplay}>replay</button>
        <p>{actionDec}</p>
        <div style={style} className="box">
          box
        </div>
      </div>

      <ul>
        {commandStack.map((item) => (
          <li key={item.time}>
            {item.name}-{item.time}
          </li>
        ))}
      </ul>
    </div>
  )
}

ReactDOM.render(<CommandDemo />, document.getElementById('root'))
