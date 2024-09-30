const fs = require("fs-extra");
const path = require("path");

// 指定したディレクトリ内を再帰的に探索する関数
async function findAndModifyPhpFiles(dir) {
    const files = await fs.readdir(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = await fs.stat(fullPath);

        if (stat.isDirectory()) {
            // ディレクトリの場合は再帰的に探索
            await findAndModifyPhpFiles(fullPath);
        } else if (path.basename(fullPath) === "messages.php") {
            // ファイル名が 'messages.php' の場合
            await modifyPhpFile(fullPath);
        }
    }
}

/**
 * ファイルの最初に '<?php return ' を、最後に '?>' を挿入する関数
 * localazy.jsonで downloadではなく conversion を指定すると、
 * <?php return が挿入されないため、この関数で挿入処理を行う
 *
 * @param {*} filePath
 */
async function modifyPhpFile(filePath) {
    try {
        let content = await fs.readFile(filePath, "utf8");

        // すでにPHPタグが含まれている場合は何もしない
        if (!content.startsWith("<?php return")) {
            content = `<?php return ${content.trim()};\n?>`;
            await fs.writeFile(filePath, content, "utf8");
            console.log(`Modified: ${filePath}`);
        } else {
            console.log(`Already modified: ${filePath}`);
        }
    } catch (err) {
        console.error(`Error modifying file: ${filePath}`, err);
    }
}

// 実行するディレクトリ（ここでは './lang' ディレクトリを指定）
const targetDirectory = path.join(process.cwd(), "lang");

// スクリプトの実行
findAndModifyPhpFiles(targetDirectory).then(() => {
    console.log("Finished processing PHP files.");
});
