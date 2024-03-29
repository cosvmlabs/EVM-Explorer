import React, {useEffect, useState} from "react";
import { assetURL } from "onefx/lib/asset-url";
import { useChainConfig } from "@/shared/common/use-chain-config";
import { t } from "onefx/lib/iso-i18n";
import { chainSwitchOpts } from "@/shared/home/components/multi-chain-dropdown";
import { getGithubTmplUrl } from "@/shared/common/github-tmpl-url";
import { TOP_BAR_HEIGHT } from "./top-bar";

const addChainToMM = require("../blockscout-web-js-lib/add_chain_to_mm");

export const FOOTER_HEIGHT = 0;

export const FOOTER_ABOVE = {
  minHeight: `calc(100vh - ${FOOTER_HEIGHT + TOP_BAR_HEIGHT}px)`,
};

export function Footer(): JSX.Element {
  const [mmAdded, setMmAdded] = useState(false);
  const chainConfig = useChainConfig();
  const [githubTmplUrl, setGithubTmplUrl] = useState("");
  useEffect(() => {
    setGithubTmplUrl(getGithubTmplUrl({ symbol: chainConfig.symbol }));
  }, [chainConfig.symbol]);
  return (
    <footer className="footer">
      <div className="footer-body container">
        <div className="row footer-logo-row">
          <div className="col-md-12">
            <a className="footer-brand" href={assetURL("")}>
              <img
                className="footer-logo"
                src={assetURL("favicon.png")}
                alt="BMO"
              />
            </a>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-lg-3">
            <p className="footer-info-text">{t("meta.description")}</p>
            <div className="footer-social-icons">
              <a
                href="https://github.com/cosvmlabs/EVM-Explorer"
                rel="noreferrer"
                target="_blank"
                className="footer-social-icon"
                title="Github"
              >
                <div className="footer-social-icon-container fontawesome-icon github" />
              </a>
              <a
                href="https://twitter.com/CosvmLabs"
                rel="noreferrer"
                target="_blank"
                className="footer-social-icon"
                title="Twitter"
              >
                <div className="footer-social-icon-container fontawesome-icon twitter" />
              </a>
              <a
                href="https://t.me/CosVMCommunity"
                rel="noreferrer"
                target="_blank"
                className="footer-social-icon"
                title="Telegram"
              >
                <div className="footer-social-icon-container fontawesome-icon telegram" />
              </a>
            </div>
          </div>
          <div className="col-xs-12 col-md-4 col-lg-3 footer-list">
            <h3>CONTACT</h3>
            <ul>
              <li>
                <a
                  href={githubTmplUrl}
                  rel="noreferrer"
                  className="footer-link"
                  target="_blank"
                >
                  Submit an Issue
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/cosvmlabs/EVM-Explorer"
                  rel="noreferrer"
                  className="footer-link"
                >
                  Contribute
                </a>
              </li>
              <li>
                <a
                  href="https://www.reddit.com/user/CosVM/?rdt=48347"
                  rel="noreferrer"
                  className="footer-link"
                >
                  Chat (#CVMExplorer)
                </a>
              </li>
              
            </ul>
          </div>
          
          <div className="col-xs-12 col-md-4 col-lg-3 footer-list">
            <h3>CVM Cosmos Explorer</h3>
            <ul><li>
                <a
                  href="https://cvm-explorer.vercel.app/"
                  rel="noreferrer"
                  className="footer-link"
                >
                  Cosmos Explorer
                </a>
              </li>
              
              <li>
                <a
                  href="https://doc.cosvm.net/welcome-to-cosvm/"
                  rel="noreferrer"
                  className="footer-link"
                >
                    Documentation
                </a>
              </li>

              <li>
                <a
                  href="https://cosvm.network/cosvm-whitepaper.pdf"
                  className="footer-link"
                >
                  WhitePaper                </a>
              </li>
              
              </ul>
            
          
          </div>
          <div className="col-xs-12 col-md-4 col-lg-3 footer-list">
                  
                <a
                  onClick={async () => {
                    await setMmAdded(await addChainToMM(chainConfig));
                  }}
                  className="footer-link js-btn-add-chain-to-mm btn-add-chain-to-mm in-footer"
                  style={{ cursor: "pointer" }}
                >
                  {mmAdded
                    ? `${chainConfig.symbol} Added to MetaMask`
                    : `Add ${chainConfig.symbol} to MetaMask`}
                </a>
           
          </div>
        </div>
      </div>
    </footer>
  );
}
