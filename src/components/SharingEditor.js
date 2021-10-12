import React, { useEffect, useState, useCallback } from 'react'

import {
  Modal,
} from '@mui/material'
import {
  QrCodeSharp as QrCodeIcon,
  AssessmentSharp as AssessmentIcon,
  ContentCopySharp as CopyIcon,
} from '@mui/icons-material'

import { Localized } from '../fluent/Localized.js' // useLocalization

import classes from './SharingEditor.module.css'

import HtmlInput from './HtmlInput.js'

function SharingEditor({
  defaultBlock = {},
  open = false,
  onChange,
  onClose,
}) {

  const [ newPath, setNewPath ] = useState('')
  const [ properties, setProperties ] = useState({})

  const {
    trigger = {},
  } = properties

  const {
		path = '',
  } = trigger

  useEffect(() => {
    console.log('defaultBlock', defaultBlock)

    setProperties(defaultBlock.properties)
  }, [ setProperties, defaultBlock ])

  const savePath = useCallback(() => {
    setProperties(oldProperties => {
      const newProperties = {...oldProperties}
      if (newPath === '') {
        if (newProperties.hasOwnProperty('trigger')) {
          delete newProperties.trigger
        }
        if (newProperties.hasOwnProperty('action')) {
          delete newProperties.action
        }
      } else {
        newProperties.trigger = {
		    	type: 'path',
		    	path: newPath,
		    }
		    newProperties.action = {
		    	type: 'render_block',
		    }
      }

      return newProperties
    })
  }, [ newPath, setProperties ])

  const viewStatistics = () => {
    const a = document.createElement('a')
    a.href = `https://umami.qiekub.org/share/s0ZHBZbb/volt.link?url=%2F${path}`
    a.target = '_blank'
    a.rel = 'noreferrer'
    a.click()
  }

  const gotoQrcodePage = () => {
    const a = document.createElement('a')
    a.href = `https://qrcode.volt.link/?c=volt.link/${path}`
    a.target = '_blank'
    a.rel = 'noreferrer'
    a.click()
  }

  if (!open) {
    return null
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      hideBackdrop={true}
      // BackdropComponent={<Backdrop open={true} className={classes.backdrop} />}
      // aria-labelledby="modal-modal-title"
      // aria-describedby="modal-modal-description"
    >
      <>
        <div className={classes.backdrop} onClick={onClose}></div>

        <div className={classes.dialog}>

            <h1 style={{ margin: '0 0 var(--basis_x4) 0' }}>Get the link</h1>
            {/* <p>Enter @volteuropa.org addresses to give editing rights.<br/>Groups addresses are not supported.</p> */}

            {/* <hr style={{ opacity: 0.2 }} /> */}

            <div className={classes.inputWrapper}>
              <HtmlInput
                defaultValue={path}
                onChange={setNewPath}
                linebreak={false}
                className={classes.input}
              />
              <button
                onClick={savePath}
              >
                Save
              </button>
            </div>

            <hr style={{ opacity: 0.2 }} />

            <pre>
              {JSON.stringify(properties, null, 4)}
            </pre>

            <hr style={{ opacity: 0.2 }} />

            <div className={classes.actions}>
              {
                path !== ''
                ? <div>
                    <button className="text hasIcon" onClick={gotoQrcodePage} style={{ marginInlineStart: '0' }}>
                      <QrCodeIcon className="icon" />
                      <span className="hideOnSmallScreen"><Localized id="sharing_qrcode" /></span>
                    </button>
                    <button className="text hasIcon" onClick={viewStatistics}>
                      <AssessmentIcon className="icon" />
                      <span className="hideOnSmallScreen"><Localized id="sharing_statistics" /></span>
                    </button>
                    <button className="text hasIcon" onClick={viewStatistics}>
                      <CopyIcon className="icon" />
                      <span className="hideOnSmallScreen"><Localized id="sharing_copy_url" /></span>
                    </button>
                  </div>
                : <div></div>
              }

              <button onClick={onClose} className="green" style={{ marginInlineEnd: '0' }}>Done</button>
            </div>
        </div>
      </>
    </Modal>
  )
}

export default SharingEditor
