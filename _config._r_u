$stdout.sync = true

use Rack::Static,
  :urls => ["/css", "/fonts", "docs/", "docs/*", "docs/css/*", "docs/partial/*", "docs/js/*", "docs/fonts/*", "/img", "/js", ".", "blog/", "blog/css/", "blog/*", "starcraft/", "starcraft/*", "starcraft/bgm", "starcraft/Characters", "starcraft/Controller", "starcraft/css/", "starcraft/GameRule", "starcraft/img", "starcraft/img/*", "starcraft/Utils"],
  :root => "."

run lambda { |env|
  [
    200,
    {
      'Content-Type'  => 'text/html',
      'Cache-Control' => 'public, max-age=86400'
    },
    File.open('index.html', File::RDONLY)
  ]
}

